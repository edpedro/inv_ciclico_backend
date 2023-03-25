import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hashSync(data.password, 10);

    const userExist = await this.prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (userExist) {
      throw new HttpException('Usuario já cadastrado', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        name: true,
        username: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
      },
    });
  }
  async FindUsername(data: { username: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      throw new HttpException('Usuario não encontrado', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        username: true,
      },
    });

    if (!user) {
      throw new HttpException('Usuario não encontrado', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          name: data.name,
          username: data.username,
        },
        select: {
          name: true,
          username: true,
        },
      });
    } catch (error) {
      throw new HttpException('Usuario não atualizado', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException('Usuario não deletado', HttpStatus.BAD_REQUEST);
    }
  }
}
