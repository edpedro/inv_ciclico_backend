import { UsersRepository } from './../repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class ListUsersInvitedUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<UserDto[]> {
    return this.usersRepository.findAllInvited(id);
  }
}
