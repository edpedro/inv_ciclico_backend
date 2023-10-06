import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ExportFileService } from '../service/export-file.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('export')
@UseGuards(AuthGuard('jwt'))
export class ExportFileController {
  constructor(private readonly exportFileService: ExportFileService) {}

  @Get(':id')
  exportFileFicha(@Param('id') id: string, @Res() res: Response) {
    return this.exportFileService.exportFicha(id, res);
  }
}
