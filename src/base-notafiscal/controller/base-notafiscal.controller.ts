import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptionsPDF, UploadPDFDto } from 'src/utils/file-upload.dto';
import { BaseNotafiscalService } from '../service/base-notafiscal.service';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { FindNumberaseNotafiscalDto } from '../dto/find-base-notafiscal.dto';
import { UpdateBaseNotafiscalDto } from '../dto/update-base-notafiscal.dto';

@Controller('notafiscal')
@UseGuards(AuthGuard('jwt'))
export class BaseNotafiscalController {
  constructor(private readonly baseNotafiscalService: BaseNotafiscalService) {}

  @Post('/file')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptionsPDF))
  async uploadNotaFiscal(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: UploadPDFDto,
    @Req() req: ReqUserDto,
  ) {
    return this.baseNotafiscalService.createNotaFiscal(files, data, req);
  }

  @Get()
  async findAllNotaFiscal(@Req() req: ReqUserDto) {
    return this.baseNotafiscalService.findAllNotaFiscal(req);
  }

  @Get(':id')
  async findIdExpedicaoNota(@Param('id') id: string, @Req() req: ReqUserDto) {
    return this.baseNotafiscalService.findOneExpedicao(id, req);
  }

  @Get('/status/:id')
  async findIdStatusNotaFsical(@Param('id') id: string, @Req() req: ReqUserDto) {
    return this.baseNotafiscalService.findIdStatusNotaFsical(id, req);
  }

  @Delete('/number/:id')
  async removeNumberNota(
    @Body() data: FindNumberaseNotafiscalDto,
    @Req() req: ReqUserDto,
  ) {
    return this.baseNotafiscalService.removeNumberNotaFsical(data, req);
  }

  @Delete(':id')
  async removeNotaFiscal(@Param('id') id: string, @Req() req: ReqUserDto) {
    return this.baseNotafiscalService.removeNotaFsical(id, req);
  }

  @Patch('/conference/:id')
  async updateConference(
    @Param('id') id: string,
    @Body() data: UpdateBaseNotafiscalDto,
    @Req() req: ReqUserDto,
  ) {
    return this.baseNotafiscalService.updateConference(data, +id, req);
  }
}
