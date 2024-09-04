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
import { BullModule } from '@nestjs/bull';
import { BaseSerialProcessor } from './processors/base-serial.processor';
import { ListAllCountBaseSerialUseCase } from './usecases/list-all-base-serial.usecase';
import { CreateStatusJobUserUseCase } from './usecases/create-statusJob-serial.usecase';
import { ListAllStatusJobsUserCase } from './usecases/list-all-statusJobs-serial.usecase';
import { ListAllChunksBaseSerialUseCase } from './usecases/list-chuncks-base-serial.usecase';
import { ListAllCodigoBaseSerialUseCase } from './usecases/list-codigo-base-serial.usecase ';
import { RemoveCodigoBaseSerialUseCase } from './usecases/romove-codigo-base-serial.usecase';
import { RedisModule } from 'src/redis.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'baseSerialQueue',
      settings: {
        stalledInterval: 30000, // Verifica jobs travados a cada 30 segundos
        maxStalledCount: 2, // Job é marcado como falho após 2 reinícios
        lockDuration: 600000, // Extender a duração do lock para 10 minutos
      },
    }),
    RedisModule,
  ],
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
    BaseSerialProcessor,
    ListAllCountBaseSerialUseCase,
    CreateStatusJobUserUseCase,
    ListAllStatusJobsUserCase,
    ListAllChunksBaseSerialUseCase,
    ListAllCodigoBaseSerialUseCase,
    RemoveCodigoBaseSerialUseCase,
  ],
})
export class BaseSerialModule {}
