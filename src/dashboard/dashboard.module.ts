import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DashboardController } from './controller/dashboard.controller';
import { DashboardService } from './service/dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, PrismaService],
  exports: [DashboardService],
})
export class DashboardModule {}
