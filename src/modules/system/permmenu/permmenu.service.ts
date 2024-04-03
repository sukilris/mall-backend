import { AbstractService } from '@/common/abstract.service';
import { SysPermMenuEntity } from '@/entities/sys-perm-menu.entity';
import { Injectable } from '@nestjs/common';
import {
  SysPermMenuAddReqDto,
  SysPermMenuDeleteReqDto,
  SysPermMenuItemRespDto,
  SysPermMenuUpdateReqDto,
} from './permmenu.dto';
import { AppConfigService } from '@/shared/services/app-config.service';
import { ApiFailedException } from '@/exceptions/api-failed.exception';
import { ErrorEnum } from '@/constants/errorx';
import { TREE_ROOT_NODE_ID } from '@/constants/core';
import { SysMenuTypeEnum } from '@/constants/type';
import { omit } from 'lodash';
import { SysPermMenuRepository } from '@/repositories/sys-perm-menu.repository';

@Injectable()
export class SystemPermenuService extends AbstractService {
  constructor(
    private readonly configService: AppConfigService,
    private readonly sysPermMenuRepo: SysPermMenuRepository,
  ) {
    super();
  }

  async getPermmenuList() {
    const permmenus = await this.entityManager.find(SysPermMenuEntity, {
      select: [
        'activeRouter',
        'icon',
        'id',
        'isShow',
        'name',
        'orderNum',
        'parentId',
        'perms',
        'router',
        'type',
        'viewPath',
      ],
    });
    return permmenus.map((e) => new SysPermMenuItemRespDto(e)).toList();
  }

  async addPermMenu(item: SysPermMenuAddReqDto): Promise<void> {
    await this.checkPermMenuParentInvalid(item.parentId);
    await this.entityManager.insert(SysPermMenuEntity, {
      ...omit(item, 'perms'),
      perms: JSON.stringify(item.perms),
    });
  }

  async deletePermMenu(item: SysPermMenuDeleteReqDto) {
    // 检查是否为保护的保护的菜单ID
    if (item.id < this.configService.appConfig.protectSysPermMenuMaxId) {
      throw new ApiFailedException(ErrorEnum.CODE_1112);
    }
    // 检查是否有含有子项
    const count = await this.entityManager.count(SysPermMenuEntity, {
      where: {
        parentId: item.id,
      },
    });
    if (count > 0) {
      throw new ApiFailedException(ErrorEnum.CODE_1113);
    }
    await this.entityManager.delete(SysPermMenuEntity, {
      id: item.id,
    });
  }
  async updatePermMenu(item: SysPermMenuUpdateReqDto): Promise<void> {
    if (item.id <= this.configService.appConfig.protectSysPermMenuMaxId) {
      throw new ApiFailedException(ErrorEnum.CODE_1112);
    }
    if (item.id === item.parentId) {
      throw new ApiFailedException(ErrorEnum.CODE_1115);
    }
    await this.checkPermMenuParentInvalid(item.parentId);
    const allSubPermMenuIds: number[] =
      await this.sysPermMenuRepo.findAllSubIds(item.id);
    if (allSubPermMenuIds.includes(item.parentId)) {
      throw new ApiFailedException(ErrorEnum.CODE_1116);
    }
    await this.entityManager.update(
      SysPermMenuEntity,
      { id: item.id },
      { ...omit(item, ['id', 'perms']), perms: JSON.stringify(item.perms) },
    );
  }
  private async checkPermMenuParentInvalid(pid: number): Promise<void> {
    if (pid === TREE_ROOT_NODE_ID) return;
    const parent = await this.entityManager.findOne(SysPermMenuEntity, {
      select: ['id', 'type'],
      where: {
        id: pid,
      },
    });
    if (!parent) {
      throw new ApiFailedException(ErrorEnum.CODE_1117);
    }
    if (parent.type === SysMenuTypeEnum.Permission) {
      throw new ApiFailedException(ErrorEnum.CODE_1118);
    }
  }
}
