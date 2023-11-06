import { BaseInventarioRepository } from './../base-inventario/repositories/base-inventario.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DashboardController } from './controller/dashboard.controller';
import { DashboardService } from './service/dashboard.service';
import { ListAllBaseInventarioUseCase } from 'src/base-inventario/usecases/list-all-inventario.usecase';

@Module({
  controllers: [DashboardController],
  providers: [
    DashboardService,
    PrismaService,
    BaseInventarioRepository,
    ListAllBaseInventarioUseCase,
  ],
  exports: [DashboardService],
})
export class DashboardModule {}
