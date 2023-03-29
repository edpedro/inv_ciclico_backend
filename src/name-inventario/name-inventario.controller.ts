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
@UseGuards(AuthGuard('jwt'))
export class NameInventarioController {
  constructor(private readonly nameInventarioService: NameInventarioService) {}

  @Post()
  create(@Body() data: CreateNameInventarioDto, @Req() req: any) {
    return this.nameInventarioService.create(data, req);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.nameInventarioService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.nameInventarioService.findOne(id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNameInventarioDto: UpdateNameInventarioDto,
    @Req() req: any,
  ) {
    return this.nameInventarioService.update(id, updateNameInventarioDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.nameInventarioService.remove(id, req);
  }
}
