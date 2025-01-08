import { Controller, Get, Param, Res, UseGuards, Req } from '@nestjs/common';
import { ExportFileService } from '../service/export-file.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Controller('export')
@UseGuards(AuthGuard('jwt'))
export class ExportFileController {
  constructor(private readonly exportFileService: ExportFileService) {}

  @Get(':id')
  exportFileFicha(@Param('id') id: string, @Res() res: Response) {
    return this.exportFileService.exportFicha(id, res);
  }
  @Get('protocolo/:id')
  exportFileProcotol(@Param('id') id: string, @Res() res: Response) {
    return this.exportFileService.exportProtocol(id, res);
  }

  @Get('expedicao/:id')
  exportFileExpedicao(@Param('id') id: string, @Res() res: Response) {
    return this.exportFileService.exportProtocolExpedicao(id, res);
  }
}
