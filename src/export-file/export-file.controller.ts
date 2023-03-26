import { Controller, Get, Param, Res } from '@nestjs/common';
import { ExportFileService } from './export-file.service';
import { Response } from 'express';

@Controller('export')
export class ExportFileController {
  constructor(private readonly exportFileService: ExportFileService) {}

  @Get(':id')
  exportFileFicha(@Param('id') id: string, @Res() res: Response) {
    return this.exportFileService.exportFicha(id, res);
  }
}
