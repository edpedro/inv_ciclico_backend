import { UserDto } from './../dto/user.dto';
import { UsersRepository } from './../repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(data: CreateUserDto): Promise<UserDto> {
    return this.usersRepository.createUser(data);
  }
}
