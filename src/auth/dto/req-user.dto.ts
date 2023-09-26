import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class ReqUserDto {
  readonly user: UserDto;
}
