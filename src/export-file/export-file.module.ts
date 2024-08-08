import { ListOneInventarioUseCase } from './../name-inventario/usecases/list-one-nameInventario.usecase';
import { NameInventarioRepository } from './../name-inventario/repositories/name-inventario.repository';
import { Module } from '@nestjs/common';
import { ExportFileService } from './service/export-file.service';
import { ExportFileController } from './controller/export-file.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { ListAllNameInventarioUseCase } from 'src/name-inventario/usecases/list-all-nameInventario.usecase';
import { ListBaseInventarioUseCase } from './usecases/list-base-protocol.export-file.usecase';
import { ListOneNameInventarioUseCase } from 'src/name-inventario/usecases/list-one-user-nameInventario.usecase';
import { ExportFileRepository } from './repositories/export-file.repository';
import { ListBaseProcotolUseCase } from './usecases/list-base-inventario.export-file.usecase copy';
import { ListIdNameProtocolUseCase } from 'src/name-protocol/usecases/list-id-nameProtocol.usecase';
import { ListIdProtocolUseCase } from 'src/base-protocol/usecases/list-id-baseProtocol.usecase';
import { NameProtocolRepository } from 'src/name-protocol/repositories/name-protocol.repository';
import { BaseProtocolRepository } from 'src/base-protocol/repositories/base-protocol.repository';

@Module({
  imports: [UsersModule],
  controllers: [ExportFileController],
  providers: [
    ExportFileService,
    PrismaService,
    ExportFileRepository,
    NameProtocolRepository,
    BaseProtocolRepository,
    ListBaseInventarioUseCase,
    ListOneInventarioUseCase,
    NameInventarioRepository,
    ListBaseProcotolUseCase,
    ListIdNameProtocolUseCase,
    ListIdProtocolUseCase,
  ],
})
export class ExportFileModule {}
