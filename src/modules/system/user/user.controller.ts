import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemUserService } from './user.service';
import { PageOptionsDto } from '@/common/dtos/page-options.dto';

@ApiTags('System user - 系统用户')
@ApiSecurityAuth()
@Controller('user')
export class SystemUserController {
  constructor(private readonly userService: SystemUserService) {}

  async page(@Query() query: PageOptionsDto) {}
}
