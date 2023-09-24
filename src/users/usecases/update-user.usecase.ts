import { UsersRepository } from './../repositories/users.repository';
import { UserDto } from '../dto/user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: string, data: UpdateUserDto): Promise<UserDto> {
    return this.usersRepository.update(id, data);
  }
}
