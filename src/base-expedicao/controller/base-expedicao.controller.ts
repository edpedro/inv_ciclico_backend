import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BaseExpedicaoService } from '../service/base-expedicao.service';
import { CreateBaseExpedicaoDto } from '../dto/create-base-expedicao.dto';
import { UpdateBaseExpedicaoDto } from '../dto/update-base-expedicao.dto';
import { AuthGuard } from '@nestjs/passport';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Controller('expedicao')
@UseGuards(AuthGuard('jwt'))
export class BaseExpedicaoController {
  constructor(private readonly baseExpedicaoService: BaseExpedicaoService) {}

  @Post()
  createExpedicao(
    @Body() createBaseExpedicaoDto: CreateBaseExpedicaoDto,
    @Req() req: ReqUserDto,
  ) {
    return this.baseExpedicaoService.createExpedição(
      createBaseExpedicaoDto,
      req,
    );
  }

  @Get()
  findAll(@Req() req: ReqUserDto) {
    return this.baseExpedicaoService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: ReqUserDto) {
    return this.baseExpedicaoService.findOne(id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBaseExpedicaoDto: UpdateBaseExpedicaoDto,
    @Req() req: ReqUserDto,
  ) {
    return this.baseExpedicaoService.update(id, updateBaseExpedicaoDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: ReqUserDto) {
    return this.baseExpedicaoService.remove(id, req);
  }

  @Post('/blocked/:id')
  releaseBlocked(@Param('id') id: string, @Req() req: ReqUserDto) {
    return this.baseExpedicaoService.releaseBlocked(id, req);
  }
}
