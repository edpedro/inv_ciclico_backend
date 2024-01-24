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
import { BaseInventarioService } from '../service/base-inventario.service';
import { ListEnderecoDto } from '../dto/list-endereco.dto';
import { ListItemDto } from '../dto/list-item.dto';
import { UpdateBaseInventarioDto } from '../dto/update-base-inventario.dto';
import { UpdateWmsInventarioDto } from '../dto/update-wms-inventario.dto';
import { ListItemHistoricoDto } from '../dto/list-historico.item.dto';
import { AlocateEnderecoUserDto } from '../dto/alocate-endereco-inventario.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

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
  async listInventario(@Param('id') id: string, @Req() req: ReqUserDto) {
    return await this.baseInventarioService.listBaseInventario(id, req);
  }

  @Get('endereco/:id')
  async totalEndereco(@Param('id') id: string, @Req() req: ReqUserDto) {
    return await this.baseInventarioService.listTotalEndereco(id, req);
  }
  @Post('historico')
  async historicoItem(@Body() data: ListItemHistoricoDto) {
    return await this.baseInventarioService.allHistoryItem(data);
  }
  @Delete('endereco/:id')
  async removeInv(@Param('id') id: string, @Req() req: any) {
    return await this.baseInventarioService.removeInventario(id, req);
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
    return await this.baseInventarioService.updateInventario(data, id, req);
  }

  @Patch('second/:id')
  async updateItemSecondCount(
    @Body() data: UpdateBaseInventarioDto,
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return await this.baseInventarioService.updateAdminSecondCount(
      data,
      id,
      req,
    );
  }

  @Patch('wms/:id')
  async updateItemWms(
    @Body() data: UpdateWmsInventarioDto,
    @Param('id') id: string,
    @Req() req: ReqUserDto,
  ) {
    return await this.baseInventarioService.updateAdminWMS(data, id, req);
  }

  @Post('endereco/user/:id')
  async alocateEnderecoUser(
    @Body() data: AlocateEnderecoUserDto[],
    @Param('id') id: string,
  ) {
    return await this.baseInventarioService.alocateEnderecoUser(data, id);
  }
  @Get('endereco/user/:id')
  async listAlocateEnderecoUser(
    @Param('id') id: string,
    @Req() req: ReqUserDto,
  ) {
    return await this.baseInventarioService.listAlocateEnderecoUserIn(id, req);
  }
  @Delete('endereco/user/:id')
  async removeAlocateEnderecoUser(
    @Body() data: AlocateEnderecoUserDto[],
    @Param('id') id: string,
  ) {
    return await this.baseInventarioService.removeAlocateEnderecoUser(data, id);
  }
}
