import { UsersRepository } from './../repositories/users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string) {
    return this.usersRepository.remove(id);
  }
}
