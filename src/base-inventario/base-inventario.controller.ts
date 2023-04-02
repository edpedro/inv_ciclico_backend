import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions, UploadDto } from 'src/utils/file-upload.dto';
import { BaseInventarioService } from './base-inventario.service';
import { ListEnderecoDto } from './dto/list-endereco.dto';
import { ListItemDto } from './dto/list-item.dto';
import { UpdateBaseInventarioDto } from './dto/update-base-inventario.dto';

@Controller('ciclico')
@UseGuards(AuthGuard('jwt'))
export class BaseInventarioController {
  constructor(private readonly baseInventarioService: BaseInventarioService) {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  updalodCsv(
    @UploadedFile() file: UploadDto,
    @Body() data: UploadDto,
    @Req() req: any,
  ) {
    return this.baseInventarioService.uploadInventario(file, data, req);
  }

  @Get(':id')
  async listInventario(@Param('id') id: string) {
    return await this.baseInventarioService.listBaseInv(id);
  }

  @Get('endereco/:id')
  async totalEndereco(@Param('id') id: string) {
    return await this.baseInventarioService.listTotalEndereco(id);
  }
  @Delete('endereco/:id')
  async removeInv(@Param('id') id: string, @Req() req: any) {
    return await this.baseInventarioService.remove(id, req);
  }
  @Post('endereco/:id')
  async listIEndereco(@Body() data: ListEnderecoDto, @Param('id') id: string) {
    return await this.baseInventarioService.listEndereco(data, id);
  }
  @Post('item/:id')
  async listItem(@Body() data: ListItemDto, @Param('id') id: string) {
    return await this.baseInventarioService.listItem(data, id);
  }

  @Patch(':id')
  async updateItem(
    @Body() data: UpdateBaseInventarioDto,
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return await this.baseInventarioService.update(data, id, req);
  }
}
