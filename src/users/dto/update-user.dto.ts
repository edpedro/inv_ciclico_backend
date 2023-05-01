import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  readonly name: string;

  readonly username: string;

  readonly password?: string;

  readonly role: string;
}
