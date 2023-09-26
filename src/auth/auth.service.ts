import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
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
      user = await this.usersService.FindUsername({ username });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
}
