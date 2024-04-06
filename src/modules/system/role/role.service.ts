import { AbstractService } from '@/common/abstract.service';
import { SysRoleEntity } from '@/entities/sys-role.entity';
import { SysRoleRepository } from '@/repositories/sys-role.repository';
import { AppConfigService } from '@/shared/services/app-config.service';
import {
  SysRoleAddReqDto,
  SysRoleListItemRespDto,
  SysRoleUpdateReqDto,
} from './role.dto';
import { TREE_ROOT_NODE_ID } from '@/constants/core';
import { isEmpty } from 'class-validator';
import { ApiFailedException } from '@/exceptions/api-failed.exception';
import { ErrorEnum } from '@/constants/errorx';
import { SysUserEntity } from '@/entities/sys-user.entity';
import { omit } from 'lodash';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemRoleService extends AbstractService {
  constructor(
    private readonly configService: AppConfigService,
    private readonly sysRoleRepo: SysRoleRepository,
  ) {
    super();
  }

  async getRoleByList() {
    const roles = await this.entityManager.find(SysRoleEntity);
    return roles.map((e) => new SysRoleListItemRespDto(e)).toList();
  }

  async addRole(item: SysRoleAddReqDto): Promise<void> {
    await this.checkParentRoleInvalid(item.parentId);

    await this.entityManager.insert(SysRoleEntity, item);
  }

  async deleteRole(roleId: number): Promise<void> {
    const childCount = await this.entityManager.count(SysRoleEntity, {
      where: { parentId: roleId },
    });
    if (childCount > 0) {
      throw new ApiFailedException(ErrorEnum.CODE_1105);
    }

    const countUse = await this.entityManager
      .createQueryBuilder(SysUserEntity, 'user')
      .where('JSON_CONTAINS(user.role_ids, JSON_ARRAY(:id))', { id: roleId })
      .andWhere('user.id != :rootId', {
        rootId: this.configService.appConfig.rootUserId,
      })
      .getCount();

    if (countUse > 0) {
      throw new ApiFailedException(ErrorEnum.CODE_1106);
    }

    await this.entityManager.delete(SysRoleEntity, { id: roleId });
  }

  async updateRole(item: SysRoleUpdateReqDto): Promise<void> {
    await this.checkParentRoleInvalid(item.parentId);

    if (item.id === item.parentId) {
      throw new ApiFailedException(ErrorEnum.CODE_1107);
    }

    const allSubRoleIds: number[] = await this.sysRoleRepo.findAllSubIds([
      item.id,
    ]);

    if (allSubRoleIds.includes(item.parentId)) {
      throw new ApiFailedException(ErrorEnum.CODE_1109);
    }

    await this.entityManager.update(
      SysRoleEntity,
      { id: item.id },
      { ...omit(item, 'id') },
    );
  }
  private async checkParentRoleInvalid(pid: number): Promise<void> {
    if (pid !== TREE_ROOT_NODE_ID) {
      const parent = await this.entityManager.findOne(SysRoleEntity, {
        select: ['id', 'status'],
        where: {
          id: pid,
        },
      });
      if (isEmpty(parent)) {
        throw new ApiFailedException(ErrorEnum.CODE_1110);
      }
    }
  }
}
