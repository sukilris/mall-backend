import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SystemPermenuService } from './permmenu.service';
import { wrapResponse } from '@/common/utils/swagger';
import { SysPermMenuItemRespDto } from './permmenu.dto';

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
}
