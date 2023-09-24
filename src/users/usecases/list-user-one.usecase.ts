import { UsersRepository } from './../repositories/users.repository';
import { UserDto } from '../dto/user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUserOneUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string): Promise<UserDto> {
    return this.usersRepository.findOne(id);
  }
}
