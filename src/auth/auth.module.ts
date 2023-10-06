import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStarty } from './strategy/jwt.strategy';
import { ListUserUsernameUseCase } from 'src/users/usecases/list-user-username.usecase';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      privateKey: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStarty,
    PrismaService,
    UsersRepository,
    ListUserUsernameUseCase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
