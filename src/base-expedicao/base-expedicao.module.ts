import { Module } from '@nestjs/common';
import { BaseExpedicaoService } from './service/base-expedicao.service';
import { BaseExpedicaoController } from './controller/base-expedicao.controller';
import { BaseExpedicaoRepository } from './repositories/base-expedicao.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBaseExpedicaoUseCase } from './usecases/create-baseExpedicao.usecase';
import { FindNameBaseExpedicaoUseCase } from './usecases/find-name-baseExpedicao.usecase';
import { UpdateStatusBaseExpedicaoUseCase } from './usecases/update-status-baseExpedicao.usecase';
import { UpdatePDFBaseExpedicaoUseCase } from './usecases/update-pdf-baseExpedicao.usecase';
import { UpdateExcelBaseExpedicaoUseCase } from './usecases/update-excel-baseExpedicao.usecase';
import { UpdateBaseExpedicaoUseCase } from './usecases/update-baseExpedicao.usecase';
import { DeleteBaseExpedicaoUseCase } from './usecases/delete-baseExpedicao.usecase';
import { UsersModule } from 'src/users/users.module';
import { ListUserOneUseCase } from 'src/users/usecases/list-user-one.usecase';
import { FindExpedicaoBaseExpedicaoUseCase } from './usecases/find-expedicao-baseExpedicao.usecase';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { ListUsersInvitedUseCase } from 'src/users/usecases/list-users-invited.usecase';
import { FindNameIdBaseExpedicaoUseCase } from './usecases/find-id-baseExpedicao.usecase';
import { UpdateBloackedBaseExpedicaoUseCase } from './usecases/update-blocked-baseExpedicao.usecase';
import { ListUsersUseCase } from 'src/users/usecases/list-users.usecase';

@Module({
  imports: [UsersModule],
  controllers: [BaseExpedicaoController],
  providers: [
    BaseExpedicaoService,
    PrismaService,
    BaseExpedicaoRepository,
    UsersRepository,
    CreateBaseExpedicaoUseCase,
    FindNameBaseExpedicaoUseCase,
    FindExpedicaoBaseExpedicaoUseCase,
    UpdateStatusBaseExpedicaoUseCase,
    UpdatePDFBaseExpedicaoUseCase,
    UpdateExcelBaseExpedicaoUseCase,
    UpdateBaseExpedicaoUseCase,
    DeleteBaseExpedicaoUseCase,
    ListUserOneUseCase,
    ListUsersInvitedUseCase,
    FindNameIdBaseExpedicaoUseCase,
    UpdateBloackedBaseExpedicaoUseCase,
    ListUsersUseCase,
    ListUserOneUseCase,
  ],
})
export class BaseExpedicaoModule {}
