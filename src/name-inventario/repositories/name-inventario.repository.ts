import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNameInventarioDto } from '../dto/create-name-inventario.dto';
import { ListNameInventarioDto } from '../dto/list-name-inventario.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { createArrayUserId } from 'src/utils/nameInventario/createArrayUserId';
import { UpdateNameInventarioDto } from '../dto/update-name-inventario.dto';
import { createArrayFkUserId } from 'src/utils/nameInventario/createArrayFkUserId';

@Injectable()
export class NameInventarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateNameInventarioDto, req: ReqUserDto) {
    const user_ids = await createArrayUserId(data);

    return await this.prisma.baseNameInventario.create({
      data: {
        name: data.name,
        date: data.date,
        type: data.type,
        create_id: req.user.id,
        users: {
          create: user_ids,
        },
      },
    });
  }

  async findOneUserName(
    name: string,
    req: ReqUserDto,
  ): Promise<ListNameInventarioDto> {
    return await this.prisma.baseNameInventario.findFirst({
      where: {
        name,
        create_id: req.user.id,
      },
    });
  }

  async findIdName(
    id: string,
    req: ReqUserDto,
  ): Promise<ListNameInventarioDto> {
    return await this.prisma.baseNameInventario.findFirst({
      where: {
        id: id,
        OR: [
          { create_id: req.user.id },
          {
            users: {
              some: {
                user_id: req.user.id,
              },
            },
          },
        ],
      },
      include: {
        users: true,
      },
    });
  }
  async findAllName(req: ReqUserDto): Promise<ListNameInventarioDto[]> {
    return await this.prisma.baseNameInventario.findMany({
      where: {
        OR: [
          { create_id: req.user.id },
          {
            users: {
              some: {
                user_id: req.user.id,
              },
            },
          },
        ],
      },
      orderBy: {
        created_at: 'desc',
      },

      select: {
        id: true,
        date: true,
        name: true,
        upload: true,
        type: true,
        firstStatus: true,
        secondStatus: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        users: true,
      },
    });
  }
  async findAllDash(): Promise<ListNameInventarioDto[]> {
    return await this.prisma.baseNameInventario.findMany({
      orderBy: {
        created_at: 'desc',
      },

      select: {
        id: true,
        date: true,
        name: true,
        firstStatus: true,
        secondStatus: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        users: true,
      },
    });
  }

  async deleteFkName(id: string) {
    await this.prisma.nameInventarioOnUsers.deleteMany({
      where: {
        nameInventario_id: id,
      },
    });
  }

  async deleteName(id: string) {
    return await this.prisma.baseNameInventario.delete({
      where: {
        id,
      },
    });
  }

  async updateName(id: string, data: UpdateNameInventarioDto) {
    return await this.prisma.baseNameInventario.update({
      where: { id },
      data: {
        name: data.name,
        date: data.date,
        type: data.type,
      },
    });
  }

  async createUserIdFk(id: string, data: UpdateNameInventarioDto) {
    const user_ids = await createArrayFkUserId(id, data);

    await this.prisma.nameInventarioOnUsers.createMany({
      data: user_ids,
    });
  }

  async findOneNameInventario(id: string): Promise<ListNameInventarioDto> {
    return await this.prisma.baseNameInventario.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findNameBaseInventario(
    id: string,
    create_id: string,
  ): Promise<ListNameInventarioDto> {
    return await this.prisma.baseNameInventario.findFirst({
      where: {
        id,
        create_id,
      },
    });
  }
  async updateStatus(id: string) {
    await this.prisma.baseNameInventario.update({
      where: {
        id,
      },
      data: {
        firstStatus: false,
        secondStatus: null,
      },
    });
  }

  async updateFirsSecondStatus(id: string, newData: UpdateNameInventarioDto) {
    await this.prisma.baseNameInventario.update({
      where: {
        id,
      },
      data: {
        ...newData,
      },
    });
  }
  async findOnUserNameInventario(req: ReqUserDto) {
    return this.prisma.baseNameInventario.findFirst({
      where: {
        create_id: req.user.id,
      },
    });
  }
  async updateUploadStatus(id: string, upload: boolean) {
    await this.prisma.baseNameInventario.update({
      where: {
        id,
      },
      data: {
        upload,
      },
    });
  }
}
