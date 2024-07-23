import { Module } from '@nestjs/common';
import { BaseSerialService } from './service/base-serial.service';
import { BaseSerialController } from './controller/base-serial.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseSerialRepository } from './repositories/base-serial.repository';
import { CreateBaseSerialUseCase } from './usecases/create-base-serial.usecase';
import { ListUserOneUseCase } from 'src/users/usecases/list-user-one.usecase';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { ListSerialBaseSerialUseCase } from './usecases/list-serial-base-serial.usecase';
import { ListSerialProtocolUseCase } from 'src/base-protocol/usecases/list-serial-baseProtocol.usecase';
import { BaseProtocolRepository } from 'src/base-protocol/repositories/base-protocol.repository';
import { RemoveBaseSerialUseCase } from './usecases/romove-base-serial.usecase';

@Module({
  controllers: [BaseSerialController],
  providers: [
    BaseSerialService,
    PrismaService,
    UsersRepository,
    BaseProtocolRepository,
    BaseSerialRepository,
    CreateBaseSerialUseCase,
    ListUserOneUseCase,
    ListSerialBaseSerialUseCase,
    ListSerialProtocolUseCase,
    RemoveBaseSerialUseCase,
  ],
})
export class BaseSerialModule {}
