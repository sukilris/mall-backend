import { AbstractService } from '@/common/abstract.service';
import { SysPermMenuEntity } from '@/entities/sys-perm-menu.entity';
import { Injectable } from '@nestjs/common';
import {
  SysPermMenuDeleteReqDto,
  SysPermMenuItemRespDto,
} from './permmenu.dto';
import { AppConfigService } from '@/shared/services/app-config.service';
import { ApiFailedException } from '@/exceptions/api-failed.exception';
import { ErrorEnum } from '@/constants/errorx';

@Injectable()
export class SystemPermenuService extends AbstractService {
  constructor(private readonly configService: AppConfigService) {
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
}
