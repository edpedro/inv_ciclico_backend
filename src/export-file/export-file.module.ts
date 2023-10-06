import { ListOneInventarioUseCase } from './../name-inventario/usecases/list-one-nameInventario.usecase';
import { NameInventarioRepository } from './../name-inventario/repositories/nameInventario.repository';
import { Module } from '@nestjs/common';
import { ExportFileService } from './service/export-file.service';
import { ExportFileController } from './controller/export-file.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { ListAllNameInventarioUseCase } from 'src/name-inventario/usecases/list-all-nameInventario.usecase';
import { ListBaseInventarioUseCase } from './usecases/list-base-inventario.export-file.usecase';
import { ListOneNameInventarioUseCase } from 'src/name-inventario/usecases/list-one-user-nameInventario.usecase';
import { ExportFileRepository } from './repositories/export-file.repository';

@Module({
  imports: [UsersModule],
  controllers: [ExportFileController],
  providers: [
    ExportFileService,
    PrismaService,
    ExportFileRepository,
    ListBaseInventarioUseCase,
    ListOneInventarioUseCase,
    NameInventarioRepository,
  ],
})
export class ExportFileModule {}
