import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNameInventarioDto } from './dto/create-name-inventario.dto';
import { UpdateNameInventarioDto } from './dto/update-name-inventario.dto';

@Injectable()
export class NameInventarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateNameInventarioDto, req: any) {
    const nameExist = await this.prisma.baseNameInventario.findFirst({
      where: {
        name: data.name,
      },
    });

    if (nameExist) {
      throw new HttpException(
        'Nome do inventario já cadastrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.baseNameInventario.create({
      data: {
        name: data.name,
        date: data.date,
        create_id: req.user.id,
        users: {
          create: data.user_id.map((user_id) => ({
            user_id,
            assignedBy: 'auth',
          })),
        },
      },
    });
  }

  async findAll(req: any) {
    const nameInv = await this.prisma.baseNameInventario.findMany({
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
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    if (!nameInv) {
      throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
    }

    return nameInv;
  }

  async findOne(id: string, req: any) {
    const nameInv = await this.prisma.baseNameInventario.findFirst({
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
    });

    if (!nameInv) {
      throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
    }

    return nameInv;
  }

  async update(
    id: string,
    updateNameInventarioDto: UpdateNameInventarioDto,
    req: any,
  ) {
    try {
      const nameInv = await this.prisma.baseNameInventario.findFirst({
        where: {
          id: id,
          create_id: req.user.id,
        },
      });

      if (!nameInv) {
        throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
      }

      return await this.prisma.baseNameInventario.update({
        where: {
          id: nameInv.id,
        },
        data: {
          name: updateNameInventarioDto.name,
          date: updateNameInventarioDto.date,
        },
      });
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string, req: any) {
    try {
      const nameInv = await this.prisma.baseNameInventario.findFirst({
        where: {
          id: id,
          create_id: req.user.id,
        },
        include: {
          users: true,
        },
      });

      if (!nameInv) {
        throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
      }

      await this.prisma.nameInventarioOnUsers.deleteMany({
        where: {
          nameInventario_id: nameInv.id,
        },
      });

      return await this.prisma.baseNameInventario.delete({
        where: {
          id: nameInv.id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não deletado', HttpStatus.BAD_REQUEST);
    }
  }
}
