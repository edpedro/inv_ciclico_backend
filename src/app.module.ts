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

@Module({
  imports: [
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
  ],
  providers: [PrismaService],
})
export class AppModule {}
