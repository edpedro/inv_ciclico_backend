import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBaseInventarioDto } from '../dto/create-base-inventario.dto';
import { ListBaseInventarioDto } from '../dto/list-base-inventario.dto';
import { ListEnderecoDto } from '../dto/list-endereco.dto';
import { ListItemDto } from '../dto/list-item.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { UpdateBaseInventarioDto } from '../dto/update-base-inventario.dto';
import { UpdateWmsInventarioDto } from '../dto/update-wms-inventario.dto';
import { ListItemHistoricoDto } from '../dto/list-historico.item.dto';
import { AlocateEnderecoUserDto } from '../dto/alocate-endereco-inventario.dto';
import { createArrayFkUserId } from 'src/utils/nameInventario/createArrayFkUserId';
import { userInventarioAssociations } from '../dto/associations-users-inventario.dto';

@Injectable()
export class BaseInventarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findNameBaseInventario(id: string): Promise<ListBaseInventarioDto> {
    return await this.prisma.baseInventario.findFirst({
      where: {
        baseNameInventario_id: id,
      },
    });
  }

  async createBaseInventario(data: CreateBaseInventarioDto[]): Promise<any> {
    return await this.prisma.baseInventario.createMany({
      data,
    });
  }

  async findAllBaseInventario(id: string) {
    return await this.prisma.baseInventario.findMany({
      where: {
        baseNameInventario_id: id,
      },

      orderBy: {
        endereco: 'asc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }

  async findAllEndereco(id: string, data: ListEnderecoDto) {
    return await this.prisma.baseInventario.findMany({
      where: {
        baseNameInventario_id: id,
        endereco: {
          equals: data.endereco,
        },
      },
      orderBy: {
        endereco: 'asc',
      },
    });
  }
  async findAllItem(data: ListItemDto, id: string) {
    return await this.prisma.baseInventario.findMany({
      where: {
        baseNameInventario_id: id,
        id: data.id,
      },
      orderBy: {
        endereco: 'asc',
      },
    });
  }
  async remove(id: string) {
    return await this.prisma.baseInventario.deleteMany({
      where: {
        baseNameInventario_id: id,
      },
    });
  }

  async findUserOnInventario(req: ReqUserDto) {
    return await this.prisma.nameInventarioOnUsers.findFirst({
      where: {
        user_id: req.user.id,
      },
    });
  }

  async findUniqueInventario(id: number, idName: string) {
    return await this.prisma.baseInventario.findFirst({
      where: {
        id,
        baseNameInventario_id: idName,
      },
    });
  }

  async update(data: UpdateBaseInventarioDto, id: number, req: ReqUserDto) {
    data.updated_at = new Date();

    return await this.prisma.baseInventario.update({
      where: {
        id,
      },
      data: {
        ...data,
        username_id: req.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }
  async findOnItemInventario(id: number) {
    return await this.prisma.baseInventario.findUnique({
      where: {
        id,
      },
    });
  }

  async updateSecond(
    id: number,
    req: ReqUserDto,
    data: UpdateBaseInventarioDto,
  ) {
    return await this.prisma.baseInventario.update({
      where: {
        id,
      },
      data: {
        secondCount: data.saldoFisico,
        username_id: req.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }

  async updateWms(id: number, data: UpdateWmsInventarioDto) {
    return await this.prisma.baseInventario.update({
      where: {
        id,
      },
      data: {
        saldoWms: data.saldoWms,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }
  async historyItem(data: ListItemHistoricoDto) {
    return await this.prisma.baseInventario.findMany({
      where: {
        item: data.item,
      },
      include: {
        baseNameInventario: {
          select: {
            name: true,
            date: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }
  async ListInventarioOnUser(user_ids: string[], nameInventario_id: string) {
    return await this.prisma.nameInventarioOnUsers.findMany({
      where: {
        nameInventario_id,
        user_id: {
          in: user_ids,
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async FindAllArrayEndereco(data: AlocateEnderecoUserDto, id: string) {
    // return await this.prisma.baseInventario.findMany({
    //   where: {
    //     baseNameInventario_id: id,
    //     endereco: {
    //       in: data.baseInventario_id,
    //     },
    //   },
    // });
  }

  async AlocateUserInventario(datas: AlocateEnderecoUserDto[], id: string) {
    const data: AlocateEnderecoUserDto[] = datas;

    for (let index of data) {
      const maxLen = Math.max(
        index.user_ids.length,
        index.baseInventario_ids.length,
      );

      for (let i = 0; i < maxLen; i++) {
        const userIDs = index.user_ids[i % index.user_ids.length];
        const baseInventarioIdS =
          index.baseInventario_ids[i % index.baseInventario_ids.length];

        await this.prisma.usersOnEnderecos.create({
          data: {
            baseNameInventario_id: id,
            user_id: userIDs,
            baseInventario_id: baseInventarioIdS,
            assignedBy: 'auth',
          },
        });
      }
    }
  }

  async findEndecoBaseInventario(id: string, req: ReqUserDto) {
    return await this.prisma.baseInventario.findMany({
      where: {
        baseNameInventario_id: id,
        users: {
          some: {
            user_id: req.user.id,
          },
        },
      },
      orderBy: {
        endereco: 'asc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }

  async findRelationUserInventario(id: string) {
    return await this.prisma.usersOnEnderecos.findMany({
      where: {
        baseNameInventario_id: id,
      },
      include: {
        baseInventario: {
          select: {
            id: true,
            endereco: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async findAllUsersInventario(id: string) {
    return await this.prisma.baseInventario.findMany({
      where: {
        baseNameInventario_id: id,
      },
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
