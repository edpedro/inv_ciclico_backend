import { CreateNameInventarioDto } from './dto/create-name-inventario.dto';
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
import { NameInventarioService } from './name-inventario.service';
import { UpdateNameInventarioDto } from './dto/update-name-inventario.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('nameinv')
export class NameInventarioController {
  constructor(private readonly nameInventarioService: NameInventarioService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: CreateNameInventarioDto, @Req() req: any) {
    return this.nameInventarioService.create(data, req);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req: any) {
    return this.nameInventarioService.findAll(req);
  }

  @Get('/dash')
  findAllDash() {
    return this.nameInventarioService.findAllDash();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.nameInventarioService.findOne(id, req);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateNameInventarioDto: UpdateNameInventarioDto,
    @Req() req: any,
  ) {
    return this.nameInventarioService.update(id, updateNameInventarioDto, req);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Req() req: any) {
    return this.nameInventarioService.remove(id, req);
  }
}
