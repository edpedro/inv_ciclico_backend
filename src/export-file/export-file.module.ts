import { Module } from '@nestjs/common';
import { ExportFileService } from './export-file.service';
import { ExportFileController } from './export-file.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ExportFileController],
  providers: [PrismaService, ExportFileService],
})
export class ExportFileModule {}
