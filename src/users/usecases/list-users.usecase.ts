import { UserDto } from './../dto/user.dto';
import { UsersRepository } from './../repositories/users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<UserDto[]> {
    return this.usersRepository.findAllUsers();
  }
}
