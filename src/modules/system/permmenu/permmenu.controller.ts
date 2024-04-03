import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SystemPermenuService } from './permmenu.service';
import { wrapResponse } from '@/common/utils/swagger';
import {
  SysPermMenuItemRespDto,
  SysPermMenuDeleteReqDto,
  SysPermMenuAddReqDto,
  SysPermMenuUpdateReqDto,
} from './permmenu.dto';

@ApiTags('System permission and menu - 系统权限及菜单')
@ApiSecurityAuth()
@Controller('perm/menu')
export class SystemPermenuController {
  constructor(private pmService: SystemPermenuService) {}

  @Get('list')
  @ApiOkResponse({
    type: wrapResponse({
      type: SysPermMenuItemRespDto,
      struct: 'list',
    }),
  })
  async list() {
    return await this.pmService.getPermmenuList();
  }
  @Post('add')
  @ApiOkResponse({ type: wrapResponse() })
  async add(@Body() body: SysPermMenuAddReqDto) {
    await this.pmService.addPermMenu(body);
  }
  @Post('update')
  @ApiOkResponse({
    type: wrapResponse(),
  })
  async update(@Body() body: SysPermMenuUpdateReqDto) {
    await this.pmService.updatePermMenu(body);
  }
  @Post('delete')
  @ApiOkResponse({
    type: wrapResponse(),
  })
  async delete(@Body() body: SysPermMenuDeleteReqDto) {
    await this.pmService.deletePermMenu(body);
  }
}
