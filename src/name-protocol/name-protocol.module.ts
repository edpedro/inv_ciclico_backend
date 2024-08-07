import { Module } from '@nestjs/common';
import { NameProtocolService } from './service/name-protocol.service';
import { NameProtocolController } from './controller/name-protocol.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NameProtocolRepository } from './repositories/name-protocol.repository';
import { CreateNameProtocolUseCase } from './usecases/create-nameProtocol.usecase';
import { ListNameProtocolUseCase } from './usecases/list-nameProtocol.usecase';
import { ListAllNameProtocolUseCase } from './usecases/list-all-nameProtocol.usecase';
import { ListIdNameProtocolUseCase } from './usecases/list-id-nameProtocol.usecase';
import { DeleteNameProtocolUseCase } from './usecases/delete-nameProtocol.usecase';
import { UpdateNameProtocolUseCase } from './usecases/update-nameProtocol.usecase';
import { ListIdAllNameProtocolUseCase } from './usecases/list-idAll-nameProtocol.usecase';
import { ListUserOneUseCase } from 'src/users/usecases/list-user-one.usecase';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { ListUsersInvitedUseCase } from 'src/users/usecases/list-users-invited.usecase';

@Module({
  controllers: [NameProtocolController],
  providers: [
    PrismaService,
    NameProtocolService,
    NameProtocolRepository,
    UsersRepository,
    CreateNameProtocolUseCase,
    ListNameProtocolUseCase,
    ListAllNameProtocolUseCase,
    ListIdNameProtocolUseCase,
    DeleteNameProtocolUseCase,
    UpdateNameProtocolUseCase,
    ListIdAllNameProtocolUseCase,
    ListUserOneUseCase,
    ListUsersInvitedUseCase,
  ],
})
export class NameProtocolModule {}
