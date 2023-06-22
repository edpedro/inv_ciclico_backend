import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [PointsController],
  providers: [PrismaService, PointsService],
})
export class PointsModule {}
