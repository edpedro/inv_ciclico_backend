import { UpdateUploadNameInventarioUseCase } from './../name-inventario/usecases/update-upload-nameInventario.usecase';
import { Module } from '@nestjs/common';
import { BaseInventarioService } from './service/base-inventario.service';
import { BaseInventarioController } from './controller/base-inventario.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListOneNameBaseInventarioUseCase } from 'src/name-inventario/usecases/list-base-nameInventario.usecase';
import { ListBaseInventarioUseCase } from './usecases/list-base-inventario.usecase';
import { CreateBaseInventarioUseCase } from './usecases/create-base-inventario.usecase';
import { NameInventarioRepository } from 'src/name-inventario/repositories/name-inventario.repository';
import { BaseInventarioRepository } from './repositories/base-inventario.repository';
import { ListAllBaseInventarioUseCase } from './usecases/list-all-inventario.usecase';
import { ListDataEnderecoBaseInventarioUseCase } from './usecases/list-data-endereco-inventario.usecase';
import { ListItemBaseInventarioUseCase } from './usecases/list-item-inventario.usecase';
import { UpdateStatusNameInventarioUseCase } from 'src/name-inventario/usecases/update-status-nameInventario.usecase';
import { RemoveBaseInventarioUseCase } from './usecases/remove-base-inventario.usecase';
import { ListUserOnNameInventarioUseCase } from './usecases/list-user-fk-name-inventario.usecase';
import { ListUniqueBaseInventarioUseCase } from './usecases/list-unique-base-inventario.usecase';
import { UpdateBaseInventarioUseCase } from './usecases/update-base-inventario.usecase';
import { UpdateFirtsSecondNameInventarioUseCase } from 'src/name-inventario/usecases/update-firsSecond-nameInventario.usecase';
import { ListUserNameBaseInventarioUseCase } from 'src/name-inventario/usecases/list-user-nameInventario.usecase';
import { ListOnItemInventarioUseCase } from './usecases/list-on-item-inventario.usecase';
import { UpdateSecondBaseInventarioUseCase } from './usecases/update-second-base-inventario.usecase';
import { UpdateWmsBaseInventarioUseCase } from './usecases/update-wms-base-inventario.usecase';
import { HistoryBaseInventarioUseCase } from './usecases/find-history-base-inventario.usecase';
import { ListUserOnInventarioUserUseCase } from './usecases/list-inv-user-inventario.usecase';
import { AlocateUserInventario } from './usecases/alocate-user-inventario.usecase';
import { ListEnderecoBaseInventarioUseCase } from './usecases/list-endereco-inventario.usecase';
import { ListRelationUserInvInventarioUseCase } from './usecases/list-relation-user-inventario.usecase';
import { ListAllUsersEnderecoBaseInventarioUseCase } from './usecases/list-all-users-endereco-inventario.usecase';
import { ListUsersIdsUseCase } from 'src/users/usecases/list-users-ids.usecase';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Module({
  imports: [],
  controllers: [BaseInventarioController],
  providers: [
    BaseInventarioService,
    PrismaService,
    BaseInventarioRepository,
    NameInventarioRepository,
    UsersRepository,
    ListOneNameBaseInventarioUseCase,
    ListBaseInventarioUseCase,
    CreateBaseInventarioUseCase,
    ListBaseInventarioUseCase,
    ListAllBaseInventarioUseCase,
    ListOneNameBaseInventarioUseCase,
    ListItemBaseInventarioUseCase,
    UpdateStatusNameInventarioUseCase,
    RemoveBaseInventarioUseCase,
    ListUserOnNameInventarioUseCase,
    ListUniqueBaseInventarioUseCase,
    UpdateBaseInventarioUseCase,
    UpdateFirtsSecondNameInventarioUseCase,
    UpdateFirtsSecondNameInventarioUseCase,
    ListUserNameBaseInventarioUseCase,
    ListOnItemInventarioUseCase,
    UpdateSecondBaseInventarioUseCase,
    UpdateWmsBaseInventarioUseCase,
    HistoryBaseInventarioUseCase,
    UpdateUploadNameInventarioUseCase,
    ListUserOnInventarioUserUseCase,
    AlocateUserInventario,
    ListEnderecoBaseInventarioUseCase,
    ListDataEnderecoBaseInventarioUseCase,
    ListRelationUserInvInventarioUseCase,
    ListAllUsersEnderecoBaseInventarioUseCase,
    ListUsersIdsUseCase,
  ],
})
export class BaseInventarioModule {}
