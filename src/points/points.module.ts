import { Module } from '@nestjs/common';
import { PointsService } from './service/points.service';
import { PointsController } from './controller/points.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { ListOnePointsUseCase } from './usecases/list-one-points.usecase';
import { PointsRepository } from './repositories/points.repository';
import { ListAllBasePointsUseCase } from './usecases/list-all-points.usecase';

@Module({
  imports: [UsersModule],
  controllers: [PointsController],
  providers: [
    PrismaService,
    PointsService,
    PointsRepository,
    ListOnePointsUseCase,
    ListAllBasePointsUseCase,
  ],
})
export class PointsModule {}
