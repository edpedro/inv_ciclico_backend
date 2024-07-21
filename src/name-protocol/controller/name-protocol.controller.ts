import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateNameProtocolDto } from '../dto/create-name-protocol.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { NameProtocolService } from '../service/name-protocol.service';
import { UpdateNameProtocolDto } from '../dto/update-name-protocol.dto';

@Controller('nameprotocol')
export class NameProtocolController {
  constructor(private readonly nameProtocolService: NameProtocolService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: CreateNameProtocolDto, @Req() req: ReqUserDto) {
    return this.nameProtocolService.create(data, req);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req: ReqUserDto) {
    return this.nameProtocolService.findAll(req);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.nameProtocolService.deleteName(id);
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() data: UpdateNameProtocolDto) {
    return this.nameProtocolService.update(id, data);
  }
}
