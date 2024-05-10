import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SystemUserService } from './user.service';
import { PageOptionsDto } from '@/common/dtos/page-options.dto';
import { wrapResponse } from '@/common/utils/swagger';
import {
  SysUserAddReqDto,
  SysUserDeleteReqDto,
  SysUserPageItemRespDto,
  SysUserUpdateReqDto,
} from './user.dto';

@ApiTags('System user - 系统用户')
@ApiSecurityAuth()
@Controller('user')
export class SystemUserController {
  constructor(private readonly userService: SystemUserService) {}

  @Get('page')
  @ApiOkResponse({
    type: wrapResponse({
      type: SysUserPageItemRespDto,
      struct: 'page',
    }),
  })
  async page(@Query() query: PageOptionsDto) {
    return this.userService.getUserByPage(query.page, query.limit);
  }

  @Post('delete')
  @ApiOkResponse({
    type: wrapResponse(),
  })
  async delete(@Body() body: SysUserDeleteReqDto) {
    await this.userService.deleteUser(body.id);
  }

  @Post('add')
  @ApiOkResponse({
    type: wrapResponse(),
  })
  async add(@Body() body: SysUserAddReqDto) {
    await this.userService.addUser(body);
  }

  @Post('update')
  @ApiOkResponse({
    type: wrapResponse(),
  })
  async update(body: SysUserUpdateReqDto) {
    await this.userService.updateUser(body);
  }
}
