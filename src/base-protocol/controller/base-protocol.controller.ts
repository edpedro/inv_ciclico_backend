import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BaseProtocolService } from '../service/base-protocol.service';
import { BaseProtocolsDto } from 'src/utils/baseProtocol/CreateProtocolDto';

@Controller('protocol')
@UseGuards(AuthGuard('jwt'))
export class BaseProtocolController {
  constructor(private readonly baseProtocolService: BaseProtocolService) {}

  @Post()
  create(@Body() data: BaseProtocolsDto) {
    return this.baseProtocolService.create(data);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.baseProtocolService.findAll(id);
  }

  @Delete('serial')
  remove(@Query('serial') serial: string) {
    return this.baseProtocolService.remove(serial);
  }
}
