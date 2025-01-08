import { Module } from '@nestjs/common';
import { BaseNotafiscalService } from './service/base-notafiscal.service';
import { BaseNotafiscalController } from './controller/base-notafiscal.controller';
import { PdfExtractorUtils } from 'src/utils/notafiscal/NotaFiscalExtractor';
import { FindNameIdBaseExpedicaoUseCase } from 'src/base-expedicao/usecases/find-id-baseExpedicao.usecase';
import { BaseExpedicaoRepository } from 'src/base-expedicao/repositories/base-expedicao.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseNotaFiscalRepository } from './repositories/base-notafiscal.repository';
import { CreateBaseNotaFiscalUseCase } from './usecases/create-baseNotaFiscal.usecase';
import { FindNumberBaseNotaFiscalUseCase } from './usecases/find-number-baseNotaFiscal.usecase';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { ListUserOneUseCase } from 'src/users/usecases/list-user-one.usecase';
import { ListUsersInvitedUseCase } from 'src/users/usecases/list-users-invited.usecase';
import { FindAllBaseNotaFiscalUseCase } from './usecases/find-all-baseNotaFiscal.usecase';
import { FindIdExpedicaoBaseNotaFiscalUseCase } from './usecases/find-idExpedicao-baseNotaFiscal.usecase';
import { UpdateExcelBaseExpedicaoUseCase } from 'src/base-expedicao/usecases/update-excel-baseExpedicao.usecase';
import { RemoveNumberBaseNotaFiscalUseCase } from './usecases/remove-number-baseNotaFiscal.usecase';
import { RemoveBaseNotaFiscalUseCase } from './usecases/remove-baseNotaFiscal.usecase';
import { UpdateConferenceBaseNotaFiscalUseCase } from './usecases/update-conference-baseNotaFiscal.usecase';
import { FindIdBaseNotaFiscalUseCase } from './usecases/find-id-baseNotaFiscal.usecase';
import { UpdateStatusBaseExpedicaoUseCase } from 'src/base-expedicao/usecases/update-status-baseExpedicao.usecase';
import { UpdateDateCurrentBaseExpedicaoUseCase } from 'src/base-expedicao/usecases/update-date-baseExpedicao.usecase';
import { UpdatePDFBaseExpedicaoUseCase } from 'src/base-expedicao/usecases/update-pdf-baseExpedicao.usecase';
import { UpdateBloackedBaseExpedicaoUseCase } from 'src/base-expedicao/usecases/update-blocked-baseExpedicao.usecase';

@Module({
  imports: [UsersModule],
  controllers: [BaseNotafiscalController],
  providers: [
    BaseNotafiscalService,
    PrismaService,
    BaseNotaFiscalRepository,
    UsersRepository,
    PdfExtractorUtils,
    BaseExpedicaoRepository,
    FindNameIdBaseExpedicaoUseCase,
    CreateBaseNotaFiscalUseCase,
    FindNumberBaseNotaFiscalUseCase,
    ListUsersInvitedUseCase,
    ListUserOneUseCase,
    FindAllBaseNotaFiscalUseCase,
    FindIdExpedicaoBaseNotaFiscalUseCase,
    UpdateExcelBaseExpedicaoUseCase,
    RemoveNumberBaseNotaFiscalUseCase,
    RemoveBaseNotaFiscalUseCase,
    UpdateConferenceBaseNotaFiscalUseCase,
    FindIdBaseNotaFiscalUseCase,
    UpdateStatusBaseExpedicaoUseCase,
    UpdateDateCurrentBaseExpedicaoUseCase,
    UpdatePDFBaseExpedicaoUseCase,
    UpdateBloackedBaseExpedicaoUseCase,
  ],
})
export class BaseNotafiscalModule {}
