import { Module } from '@nestjs/common';
import { NameInventarioService } from './name-inventario.service';
import { NameInventarioController } from './name-inventario.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NameInventarioController],
  providers: [PrismaService, NameInventarioService],
})
export class NameInventarioModule {}
