import { AbstractService } from '@/common/abstract.service';
import { SysUserEntity } from '@/entities/sys-user.entity';
import { AppConfigService } from '@/shared/services/app-config.service';
import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';

@Injectable()
export class SystemUserService extends AbstractService {
  constructor(private readonly configService: AppConfigService) {
    super();
  }
  async getUserByPage() {
    const rows = await this.entityManager.find(SysUserEntity, {
      where: {
        id: Not(this.configService.appConfig.rootUserId),
      },
    });
  }
}
