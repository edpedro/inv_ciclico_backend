import { Injectable } from '@nestjs/common';
import { UsersRepository } from './../repositories/users.repository';

@Injectable()
export class ListUserUsernameUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(username: string) {
    return this.usersRepository.findByUsername(username);
  }
}
