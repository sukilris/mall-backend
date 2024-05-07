import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SystemPermmenuModule } from './permmenu/permmenu.module';
import { SystemRoleModule } from './role/role.module';
import { SystemUserModule } from './user/user.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'sys',
        children: [SystemPermmenuModule, SystemRoleModule, SystemUserModule],
      },
    ]),
    SystemPermmenuModule,
    SystemRoleModule,
    SystemUserModule,
  ],
})
export class SystemModule {}
