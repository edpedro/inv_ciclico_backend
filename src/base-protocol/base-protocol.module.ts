import { Module } from '@nestjs/common';
import { BaseProtocolService } from './service/base-protocol.service';
import { BaseProtocolController } from './controller/base-protocol.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseProtocolRepository } from './repositories/base-protocol.repository';
import { CreateBaseProtocolUseCase } from './usecases/create-baseProtocol.usecase';
import { ListIdAllNameProtocolUseCase } from 'src/name-protocol/usecases/list-idAll-nameProtocol.usecase';
import { NameProtocolRepository } from 'src/name-protocol/repositories/name-protocol.repository';
import { ListIdNameProtocolUseCase } from 'src/name-protocol/usecases/list-id-nameProtocol.usecase';
import { ListAllProtocolUseCase } from './usecases/list-all-baseProtocol.usecase';
import { ListSerialProtocolUseCase } from './usecases/list-serial-baseProtocol.usecase';
import { DeleteSerialProtocolUseCase } from './usecases/delete-serial-baseProtocol.usecase';
import { ListAllNameProtocolUseCase } from 'src/name-protocol/usecases/list-all-nameProtocol.usecase';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { ListUserOneUseCase } from 'src/users/usecases/list-user-one.usecase';
import { ListUsersInvitedUseCase } from 'src/users/usecases/list-users-invited.usecase';
import { ListIdProtocolUseCase } from './usecases/list-id-baseProtocol.usecase';

@Module({
  controllers: [BaseProtocolController],
  providers: [
    BaseProtocolService,
    PrismaService,
    BaseProtocolRepository,
    NameProtocolRepository,
    UsersRepository,
    CreateBaseProtocolUseCase,
    ListIdAllNameProtocolUseCase,
    ListIdNameProtocolUseCase,
    ListAllProtocolUseCase,
    ListSerialProtocolUseCase,
    DeleteSerialProtocolUseCase,
    ListAllNameProtocolUseCase,
    ListUserOneUseCase,
    ListUsersInvitedUseCase,
    ListIdProtocolUseCase,
  ],
})
export class BaseProtocolModule {}
