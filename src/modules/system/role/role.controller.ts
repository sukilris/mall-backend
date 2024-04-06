import { wrapResponse } from '@/common/utils/swagger';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  SysRoleAddReqDto,
  SysRoleDeleteReqDto,
  SysRoleListItemRespDto,
  SysRoleUpdateReqDto,
} from './role.dto';
import { SystemRoleService } from './role.service';

@ApiTags('System role - 系统角色')
@ApiSecurityAuth()
@Controller('role')
export class SystemRoleController {
  constructor(private readonly roleService: SystemRoleService) {}
  @Get('list')
  @ApiOkResponse({
    type: wrapResponse({
      type: SysRoleListItemRespDto,
      struct: 'list',
    }),
  })
  async list() {
    return this.roleService.getRoleByList();
  }

  @Post('add')
  @ApiOkResponse({
    type: wrapResponse(),
  })
  async add(@Body() body: SysRoleAddReqDto) {
    return this.roleService.addRole(body);
  }

  @Post('delete')
  @ApiOkResponse({
    type: wrapResponse(),
  })
  async delete(@Body() body: SysRoleDeleteReqDto) {
    return this.roleService.deleteRole(body.id);
  }

  @Post('update')
  @ApiOkResponse({
    type: wrapResponse(),
  })
  async update(@Body() body: SysRoleUpdateReqDto) {
    return this.roleService.updateRole(body);
  }
}
