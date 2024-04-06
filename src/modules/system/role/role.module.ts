import { Module } from '@nestjs/common';
import { SystemRoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysRoleEntity } from '@/entities/sys-role.entity';
import { SystemRoleService } from './role.service';
import { SysRoleRepository } from '@/repositories/sys-role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SysRoleEntity])],
  controllers: [SystemRoleController],
  providers: [SystemRoleService, SysRoleRepository],
})
export class SystemRoleModule {}
