import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { NameInventarioService } from '../service/nameInventarioService';
import { CreateNameInventarioDto } from '../dto/create-name-inventario.dto';
import { UpdateNameInventarioDto } from '../dto/update-name-inventario.dto';

@Controller('nameinv')
export class NameInventarioController {
  constructor(private readonly nameInventarioService: NameInventarioService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: CreateNameInventarioDto, @Req() req: any) {
    return this.nameInventarioService.createName(data, req);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAllName(@Req() req: any) {
    return this.nameInventarioService.findAllName(req);
  }

  @Get('/dash')
  findAllDash() {
    return this.nameInventarioService.findAllDash();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findIdName(@Param('id') id: string, @Req() req: any) {
    return this.nameInventarioService.findIdName(id, req);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() data: UpdateNameInventarioDto,
    @Req() req: any,
  ) {
    return this.nameInventarioService.updateName(id, data, req);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Req() req: any) {
    return this.nameInventarioService.removeName(id, req);
  }
}
