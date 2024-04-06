import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SystemPermmenuModule } from './permmenu/permmenu.module';
import { SystemRoleModule } from './role/role.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'sys',
        children: [SystemPermmenuModule, SystemRoleModule],
      },
    ]),
    SystemPermmenuModule,
    SystemRoleModule,
  ],
})
export class SystemModule {}
