import { Module } from '@nestjs/common';
import { BaseInventarioService } from './service/base-inventario.service';
import { BaseInventarioController } from './controller/base-inventario.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListOneNameBaseInventarioUseCase } from 'src/name-inventario/usecases/list-base-nameInventario.usecase';
import { ListBaseInventarioUseCase } from './usecases/list-base-inventario.usecase';
import { CreateBaseInventarioUseCase } from './usecases/create-base-inventario.usecase';
import { NameInventarioRepository } from 'src/name-inventario/repositories/nameInventario.repository';
import { BaseInventarioRepository } from './repositories/base-inventario.repository';
import { ListAllBaseInventarioUseCase } from './usecases/list-all-inventario.usecase';
import { ListEnderecoBaseInventarioUseCase } from './usecases/list-endereco-inventario.usecase';
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

@Module({
  imports: [],
  controllers: [BaseInventarioController],
  providers: [
    BaseInventarioService,
    PrismaService,
    BaseInventarioRepository,
    NameInventarioRepository,
    ListOneNameBaseInventarioUseCase,
    ListBaseInventarioUseCase,
    CreateBaseInventarioUseCase,
    ListAllBaseInventarioUseCase,
    ListEnderecoBaseInventarioUseCase,
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
  ],
})
export class BaseInventarioModule {}
