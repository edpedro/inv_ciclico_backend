import { NameInventarioRepository } from './repositories/nameInventario.repository';
import { Module } from '@nestjs/common';
import { NameInventarioService } from './service/nameInventarioService';
import { NameInventarioController } from './controller/nameInventarioController';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNameInventarioUseCase } from './usecases/create-nameInventario.usecase';
import { UsersModule } from 'src/users/users.module';
import { ListOneNameInventarioUseCase } from './usecases/list-one-user-nameInventario.usecase';
import { ListIdNameUseCase } from './usecases/list-id-nameInventario.usecase';
import { ListAllNameInventarioUseCase } from './usecases/list-all-nameInventario.usecase';
import { ListDashNameInventarioUseCase } from './usecases/list-dash-nameInventario.usecase';
import { DeleteFkNameInventarioUseCase } from './usecases/delete-fk-nameInventario';
import { DeleteNameInventarioUseCase } from './usecases/delete-nameInventario';
import { CreateFkNameInventarioUseCase } from './usecases/create-fk-nameInventario';
import { UpdateNameInventarioUseCase } from './usecases/update-nameInventario';

@Module({
  imports: [UsersModule],
  controllers: [NameInventarioController],
  providers: [
    NameInventarioService,
    PrismaService,
    NameInventarioRepository,
    CreateNameInventarioUseCase,
    ListOneNameInventarioUseCase,
    ListIdNameUseCase,
    ListAllNameInventarioUseCase,
    ListDashNameInventarioUseCase,
    DeleteFkNameInventarioUseCase,
    DeleteNameInventarioUseCase,
    CreateFkNameInventarioUseCase,
    UpdateNameInventarioUseCase,
  ],
})
export class NameInventarioModule {}
