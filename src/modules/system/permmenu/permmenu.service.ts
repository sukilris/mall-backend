import { AbstractService } from '@/common/abstract.service';
import { SysPermMenuEntity } from '@/entities/sys-perm-menu.entity';
import { Injectable } from '@nestjs/common';
import { SysPermMenuItemRespDto } from './permmenu.dto';

@Injectable()
export class SystemPermenuService extends AbstractService {
  constructor() {
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
    return permmenus.map((e) => new SysPermMenuItemRespDto(e));
  }
}
