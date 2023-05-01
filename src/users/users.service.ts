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
        createdById: data.createdById ? data.createdById : null,
      },
      select: {
        name: true,
        username: true,
        role: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
      },
    });
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
        role: true,
      },
    });

    if (!user) {
      throw new HttpException('Usuario não encontrado', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const dataToUpdate: any = {
        name: data.name,
        username: data.username,
        role: data.role,
      };

      if (data.password !== undefined && data.password !== null) {
        const hashedPassword = await bcrypt.hashSync(data.password, 10);
        dataToUpdate.password = hashedPassword;
      }

      return await this.prisma.user.update({
        where: {
          id,
        },
        data: dataToUpdate,
        select: {
          name: true,
          username: true,
          role: true,
        },
      });
    } catch (error) {
      console.log(error);
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
