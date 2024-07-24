import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BaseProtocolService } from '../service/base-protocol.service';
import { BaseProtocolsDto } from 'src/utils/baseProtocol/CreateProtocolDto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Controller('protocol')
@UseGuards(AuthGuard('jwt'))
export class BaseProtocolController {
  constructor(private readonly baseProtocolService: BaseProtocolService) {}

  @Post()
  create(@Body() data: BaseProtocolsDto) {
    return this.baseProtocolService.create(data);
  }

  @Get(':id')
  findIdProtocol(@Param('id') id: string) {
    return this.baseProtocolService.findIdProtocol(id);
  }

  @Get()
  findAll(@Req() req: ReqUserDto) {
    return this.baseProtocolService.findAll(req);
  }

  @Delete('serial')
  remove(@Query('serial') serial: string) {
    return this.baseProtocolService.remove(serial);
  }
}
