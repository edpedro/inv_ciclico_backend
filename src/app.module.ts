import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BaseInventarioModule } from './base-inventario/base-inventario.module';
import { NameInventarioModule } from './name-inventario/name-inventario.module';
import { ExportFileModule } from './export-file/export-file.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PointsModule } from './points/points.module';
import { BackupModule } from './backup/backup.module';
import { AdressesModule } from './adresses/adresses.module';
import { NameProtocolModule } from './name-protocol/name-protocol.module';
import { BaseProtocolModule } from './base-protocol/base-protocol.module';
import { BaseSerialModule } from './base-serial/base-serial.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis.module';
import { BaseNotafiscalModule } from './base-notafiscal/base-notafiscal.module';
import { BaseExpedicaoModule } from './base-expedicao/base-expedicao.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    RedisModule,
    UsersModule,
    AuthModule,
    BaseInventarioModule,
    NameInventarioModule,
    ExportFileModule,
    DashboardModule,
    PointsModule,
    BackupModule,
    AdressesModule,
    NameProtocolModule,
    BaseProtocolModule,
    BaseSerialModule,
    BaseNotafiscalModule,
    BaseExpedicaoModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
