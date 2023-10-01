import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { ListUsersUseCase } from './usecases/list-users.usecase';
import { ListUsersInvitedUseCase } from './usecases/list-users-invited.usecase';
import { ListUserOneUseCase } from './usecases/list-user-one.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { ListUserUsernameUseCase } from './usecases/list-user-username.usecase';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';
import { ListUsersIdsUseCase } from './usecases/list-users-ids.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    UsersRepository,
    PrismaService,
    UsersService,
    CreateUserUseCase,
    ListUsersUseCase,
    ListUsersInvitedUseCase,
    ListUserOneUseCase,
    UpdateUserUseCase,
    ListUserUsernameUseCase,
    DeleteUserUseCase,
    ListUsersIdsUseCase,
  ],
  exports: [UsersService],
})
export class UsersModule {}
