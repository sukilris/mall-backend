import { AbstractService } from '@/common/abstract.service';
import { SysUserEntity } from '@/entities/sys-user.entity';
import { AppConfigService } from '@/shared/services/app-config.service';
import { AppGeneralService } from '@/shared/services/app-general.service';
import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';

@Injectable()
export class SystemUserService extends AbstractService {
  constructor(
    private readonly configService: AppConfigService,
    private readonly generalService: AppGeneralService,
  ) {
    super();
  }
  async getUserByPage(page: number, limit: number) {
    const options = {
      where: {
        id: Not(this.configService.appConfig.rootUserId),
      },
      skip: (page - 1) * limit,
      take: limit,
    };
    const rows = await this.entityManager.find(SysUserEntity, options);

    const count = await this.entityManager.count(SysUserEntity, options);

    return rows.toPage({ page, limit, total: count });
  }

  async deleteUser(uid: number): Promise<void> {
    if (this.generalService.isRootUser(uid)) {
      throw new Error(`User ${uid} illegally delete root`);
    }

    await this.entityManager.delete(SysUserEntity, { id: uid });
  }
}
