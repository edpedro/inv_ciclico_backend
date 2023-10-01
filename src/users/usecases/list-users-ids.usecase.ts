import { UserDto } from './../dto/user.dto';
import { UsersRepository } from './../repositories/users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUsersIdsUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(user_id: string[]): Promise<UserDto[]> {
    return this.usersRepository.getUsersByIds(user_id);
  }
}
