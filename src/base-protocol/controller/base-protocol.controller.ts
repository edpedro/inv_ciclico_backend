import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BaseProtocolService } from '../service/base-protocol.service';
import { UpdateBaseProtocolDto } from '../dto/update-base-protocol.dto';
import { BaseProtocolsDto } from 'src/utils/baseProtocol/CreateProtocolDto';

@Controller('protocol')
export class BaseProtocolController {
  constructor(private readonly baseProtocolService: BaseProtocolService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
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
