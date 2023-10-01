import { ListUsersIdsUseCase } from './../usecases/list-users-ids.usecase';
import { DeleteUserUseCase } from './../usecases/delete-user.usecase';
import { UpdateUserUseCase } from './../usecases/update-user.usecase';
import { ListUserUsernameUseCase } from './../usecases/list-user-username.usecase';
import { ListUserOneUseCase } from './../usecases/list-user-one.usecase';
import { ListUsersInvitedUseCase } from './../usecases/list-users-invited.usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { CreateUserUseCase } from '../usecases/create-user.usecase';
import { ListUsersUseCase } from '../usecases/list-users.usecase';
import { EncryptedPassword } from 'src/utils/users/encrypted-password';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly listUsersInvitedUseCase: ListUsersInvitedUseCase,
    private readonly listUserOneUseCase: ListUserOneUseCase,
    private readonly listUserUsernameUseCase: ListUserUsernameUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly listUsersIdsUseCase: ListUsersIdsUseCase,
  ) {}

  async createUser(data: CreateUserDto): Promise<UserDto> {
    const userExist = await this.listUserUsernameUseCase.execute(data.username);

    if (userExist) {
      throw new HttpException('Usuario já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const createUser = await this.createUserUseCase.execute(data);

    return createUser;
  }

  async findAllUsers() {
    const users = await this.listUsersUseCase.execute();
    return users;
  }

  async findAllUsersInvited(id: string) {
    const users = await this.listUsersInvitedUseCase.execute(id);
    return users;
  }

  async FindUsername(data: { username: string }) {
    const userExist = await this.listUserUsernameUseCase.execute(data.username);

    if (!userExist) {
      throw new HttpException('Usuario não encontrado', HttpStatus.BAD_REQUEST);
    }

    return userExist;
  }

  async findOne(id: string) {
    const userExist = await this.listUserOneUseCase.execute(id);

    if (!userExist) {
      throw new HttpException('Usuario não encontrado', HttpStatus.BAD_REQUEST);
    }

    return userExist;
  }

  async getUsersByIds(user_id: string[]) {
    const userExist = await this.listUsersIdsUseCase.execute(user_id);

    if (!userExist) {
      throw new HttpException('Usuario não encontrado', HttpStatus.BAD_REQUEST);
    }

    return userExist;
  }

  async update(id: string, data: UpdateUserDto) {
    const userExist = await this.listUserOneUseCase.execute(id);

    if (!userExist) {
      throw new HttpException('Usuario não encontrado', HttpStatus.BAD_REQUEST);
    }

    try {
      const dataToUpdate: any = {
        name: data.name,
        username: data.username,
        role: data.role,
        createdById: data.createdById,
      };

      if (data.password) {
        const hashedPassword = await EncryptedPassword(data.password);
        dataToUpdate.password = hashedPassword;
      }

      const user = await this.updateUserUseCase.execute(id, dataToUpdate);

      return user;
    } catch (error) {
      console.log(error.message);
      throw new HttpException('Usuario não atualizado', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const userExist = await this.listUserOneUseCase.execute(id);

      if (!userExist) {
        throw new HttpException(
          'Usuario não encontrado',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.deleteUserUseCase.execute(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Usuario não deletado', HttpStatus.BAD_REQUEST);
    }
  }
}
