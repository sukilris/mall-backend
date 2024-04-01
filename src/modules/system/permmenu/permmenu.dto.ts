import { SysPermMenuEntity } from '@/entities/sys-perm-menu.entity';

export class SysPermMenuItemRespDto {
  activeRouter: string;
  icon: string;
  id: number;
  isShow: number;
  name: string;
  orderNum: number;
  parentId: number;
  perms: string[];
  router: string;
  type: number;
  viewPath: string;

  constructor(entity: SysPermMenuEntity) {
    this.activeRouter = entity.activeRouter;
    this.icon = entity.icon;
    this.id = entity.id;
    this.isShow = entity.isShow;
    this.name = entity.name;
    this.orderNum = entity.orderNum;
    this.parentId = entity.parentId;
    this.perms = JSON.parse(entity.perms) || [];
    this.router = entity.router;
    this.type = entity.type;
    this.viewPath = entity.viewPath;
  }
}
