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
import { BaseNotaFiscalRepository } from 'src/base-notafiscal/repositories/base-notafiscal.repository';
import { FindIdBaseNotaFiscalUseCase } from 'src/base-notafiscal/usecases/find-id-baseNotaFiscal.usecase';
import { FindIdExpedicaoBaseNotaFiscalUseCase } from 'src/base-notafiscal/usecases/find-idExpedicao-baseNotaFiscal.usecase';
import { BaseExpedicaoRepository } from 'src/base-expedicao/repositories/base-expedicao.repository';
import { FindNameIdBaseExpedicaoUseCase } from 'src/base-expedicao/usecases/find-id-baseExpedicao.usecase';
import { ListBaseExpedicaoUseCase } from './usecases/list-base-ecpedicao.export-file.usecase';

@Module({
  imports: [UsersModule],
  controllers: [ExportFileController],
  providers: [
    ExportFileService,
    PrismaService,
    ExportFileRepository,
    NameProtocolRepository,
    BaseProtocolRepository,
    BaseNotaFiscalRepository,
    BaseExpedicaoRepository,
    ListBaseInventarioUseCase,
    ListOneInventarioUseCase,
    NameInventarioRepository,
    ListBaseProcotolUseCase,
    ListIdNameProtocolUseCase,
    ListIdProtocolUseCase,
    FindIdExpedicaoBaseNotaFiscalUseCase,
    FindNameIdBaseExpedicaoUseCase,
    ListBaseExpedicaoUseCase,
  ],
})
export class ExportFileModule {}
