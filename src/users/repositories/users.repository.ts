import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { EncryptedPassword } from 'src/utils/users/encrypted-password';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await EncryptedPassword(data.password);

    const user = this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        createdById: data.createdById ? data.createdById : null,
        role: data.role ? data.role : 'admin',
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        createdById: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }

  async findByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async findAllUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        createdById: true,
        created_at: true,
        updated_at: true,
      },
    });

    return users;
  }

  async findAllInvited(id: string) {
    return await this.prisma.user.findMany({
      where: {
        createdById: id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
      },
    });
  }
  async FindUsername(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
    return user;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
      },
    });

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        name: true,
        username: true,
        role: true,
      },
    });
  }
  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async getUsersByIds(user_id: string[]) {
    return await this.prisma.user.findMany({
      where: {
        id: {
          in: user_id,
        },
      },
    });
  }
}
