import { SysPermMenuEntity } from '@/entities/sys-perm-menu.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemPermenuController } from './permmenu.controller';
import { SystemPermenuService } from './permmenu.service';

@Module({
  imports: [TypeOrmModule.forFeature([SysPermMenuEntity])],
  controllers: [SystemPermenuController],
  providers: [SystemPermenuService],
})
export class SystemPermmenuModule {}
