import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { ListUserUsernameUseCase } from 'src/users/usecases/list-user-username.usecase';

@Injectable()
export class AuthService {
  constructor(
    private readonly listUserUsernameUseCase: ListUserUsernameUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDto) {
    const payload = {
      sub: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    };

    return {
      payload,
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    let user: CreateUserDto;
    try {
      user = await this.listUserUsernameUseCase.execute(username);
    } catch (error) {
      return null;
    }

    if (!user) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
}
