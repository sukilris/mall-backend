import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SystemPermmenuModule } from './permmenu/permmenu.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'sys',
        children: [SystemPermmenuModule],
      },
    ]),
    SystemPermmenuModule,
  ],
})
export class SystemModule {}
