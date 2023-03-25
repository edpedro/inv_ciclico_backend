import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BaseInventarioModule } from './base-inventario/base-inventario.module';
import { NameInventarioModule } from './name-inventario/name-inventario.module';

@Module({
  imports: [UsersModule, AuthModule, BaseInventarioModule, NameInventarioModule],
  providers: [PrismaService],
})
export class AppModule {}
