import { Module } from '@nestjs/common';
import { ExportFileService } from './export-file.service';
import { ExportFileController } from './export-file.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ExportFileController],
  providers: [PrismaService, ExportFileService],
})
export class ExportFileModule {}
