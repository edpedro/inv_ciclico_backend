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
import { CreateItemInventarioDto } from '../dto/create-item-inventario.dto';

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
            role: true,
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
  async AlocateUserInventario(datas: AlocateEnderecoUserDto[], id: string) {
    const timeout = 30000; // 30 segundos

    return await this.prisma.$transaction(
      async (prisma) => {
        const createOperations = [];

        // Primeiro, busque todos os registros existentes de uma vez
        const existingRecords = await prisma.usersOnEnderecos.findMany({
          where: {
            baseNameInventario_id: id,
            user_id: { in: datas.flatMap((d) => d.user_ids) },
            baseInventario_id: {
              in: datas.flatMap((d) => d.baseInventario_ids),
            },
          },
          select: {
            user_id: true,
            baseInventario_id: true,
          },
        });

        // Crie um conjunto para verificação rápida
        const existingSet = new Set(
          existingRecords.map((r) => `${r.user_id}-${r.baseInventario_id}`),
        );

        for (const index of datas) {
          const baseInventarioIds = index.baseInventario_ids;
          for (const user_id of index.user_ids) {
            for (const baseInventarioId of baseInventarioIds) {
              const key = `${user_id}-${baseInventarioId}`;
              if (!existingSet.has(key)) {
                createOperations.push({
                  baseNameInventario_id: id,
                  user_id: user_id,
                  baseInventario_id: baseInventarioId,
                  assignedBy: 'auth',
                });
              }
            }
          }
        }

        // Use createMany para inserir todos os registros de uma vez
        if (createOperations.length > 0) {
          await prisma.usersOnEnderecos.createMany({
            data: createOperations,
            skipDuplicates: true, // Ignorar duplicados se houver
          });
        }

        return createOperations.length; // Retorna o número de registros criados
      },
      {
        timeout, // Define o timeout aumentado
        maxWait: timeout, // Tempo máximo de espera para adquirir uma conexão do pool
      },
    );
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
  async removeAlocateUserInventario(
    datas: AlocateEnderecoUserDto[],
    id: string,
  ) {
    return await this.prisma.$transaction(async (prisma) => {
      // Coleta todas as chaves que precisam ser removidas
      const deleteConditions = [];

      for (const index of datas) {
        const baseInventarioIds = index.baseInventario_ids;
        for (const user_id of index.user_ids) {
          for (const baseInventarioId of baseInventarioIds) {
            deleteConditions.push({
              baseNameInventario_id: id,
              user_id: user_id,
              baseInventario_id: baseInventarioId,
              assignedBy: 'auth',
            });
          }
        }
      }

      // Remove os registros de uma vez
      if (deleteConditions.length > 0) {
        await prisma.usersOnEnderecos.deleteMany({
          where: {
            OR: deleteConditions,
          },
        });
      }
    });
  }

  async removeIdAlocateUserInventario(id: string) {
    await this.prisma.usersOnEnderecos.deleteMany({
      where: {
        baseNameInventario_id: id,
      },
    });
  }

  async storeItemInventario(
    data: CreateItemInventarioDto,
    id: string,
    req: ReqUserDto,
  ) {
    return await this.prisma.baseInventario.create({
      data: {
        item: data.item,
        descricao: data.descricao,
        tipoEstoque: '',
        catItem: '',
        saldoWms: 0,
        endereco: data.endereco,
        firstCount: data.firstCount,
        firstStatus: true,
        secondStatus: false,
        username_id: req.user.id,
        baseNameInventario_id: id,
      },
    });
  }

  async findItemInventario(item: string) {
    return await this.prisma.baseInventario.findFirst({
      where: {
        item: item,
      },
    });
  }
}
