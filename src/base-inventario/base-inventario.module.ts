import { Module } from '@nestjs/common';
import { BaseInventarioService } from './base-inventario.service';
import { BaseInventarioController } from './base-inventario.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BaseInventarioController],
  providers: [PrismaService, BaseInventarioService],
  exports: [BaseInventarioService],
})
export class BaseInventarioModule {}
