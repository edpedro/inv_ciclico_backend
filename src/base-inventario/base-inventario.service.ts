import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadDto } from 'src/utils/file-upload.dto';
import { CreateBaseInventarioDto } from './dto/create-base-inventario.dto';
import * as XLSX from 'xlsx';
import { UpdateBaseInventarioDto } from './dto/update-base-inventario.dto';

@Injectable()
export class BaseInventarioService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadInventario(file: UploadDto, dataInventario: UploadDto, req: any) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const dataJson = XLSX.utils.sheet_to_json(sheet);

    const data: CreateBaseInventarioDto[] = dataJson.map((row) => {
      return {
        item: String(row['Item']),
        descricao: row['Descricao'],
        endereco: row['Endereco'],
        tipoEstoque: row['Tip.Estoque'],
        catItem: row['Cat.Item'],
        saldoWms: row['Dispon.Exped.'],
        baseNameInventario_id: dataInventario.baseNameInventario_id,
      };
    });

    const nameInvExists = await this.prisma.baseNameInventario.findFirst({
      where: {
        id: dataInventario.baseNameInventario_id,
        users: {
          some: {
            user_id: req.user.id,
          },
        },
      },
    });

    if (!nameInvExists) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    const baseInvExists = await this.prisma.baseInventario.findFirst({
      where: {
        baseNameInventario_id: nameInvExists.id,
      },
    });

    if (baseInvExists) {
      throw new HttpException('Nome já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const createInventario = await this.prisma.baseInventario.createMany({
      data,
    });

    return createInventario;
  }

  async listBaseInv(id: string) {
    const baseInvExists = await this.prisma.baseInventario.findMany({
      where: {
        baseNameInventario_id: id,
      },
      orderBy: {
        endereco: 'asc',
      },
    });

    if (baseInvExists.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    return baseInvExists;
  }

  async listEndereco(id: string) {
    const baseInvExists = await this.prisma.baseInventario.findMany({
      where: {
        baseNameInventario_id: id,
      },
      orderBy: [{ endereco: 'asc' }],
    });

    if (baseInvExists.length <= 0) {
      throw new HttpException(
        'Endereco não encontrados',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resultado = baseInvExists.reduce((acc, item) => {
      const enderecoExistente = acc.find((e) => e.endereco === item.endereco);

      if (enderecoExistente) {
        enderecoExistente.item += 1;
        enderecoExistente.status = enderecoExistente.status && item.status;
      } else {
        acc.push({
          endereco: item.endereco,
          item: 1,
          status: item.status,
        });
      }

      return acc;
    }, []);

    return resultado;
  }

  async remove(id: string, req: any) {
    try {
      const nameInvExists = await this.prisma.baseNameInventario.findFirst({
        where: {
          id,
          users: {
            some: {
              user_id: req.user.id,
            },
          },
        },
      });

      if (!nameInvExists) {
        throw new HttpException(
          'Dados não encontrados',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.prisma.baseInventario.deleteMany({
        where: {
          baseNameInventario_id: nameInvExists.id,
        },
      });

      await this.prisma.baseNameInventario.update({
        where: {
          id,
        },
        data: {
          status: false,
        },
      });

      return result;
    } catch (error) {
      throw new HttpException('Dados não deletado', HttpStatus.BAD_REQUEST);
    }
  }

  async update(data: UpdateBaseInventarioDto, id: string, req: any) {
    try {
      const nameInvExists = await this.prisma.baseNameInventario.findFirst({
        where: {
          id,
          users: {
            some: {
              user_id: req.user.id,
            },
          },
        },
      });

      if (!nameInvExists) {
        throw new HttpException(
          'Dados não encontrados',
          HttpStatus.BAD_REQUEST,
        );
      }

      const totalInvExists = await this.prisma.baseInventario.findUnique({
        where: {
          id: data.id,
        },
      });

      if (!totalInvExists) {
        throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
      }

      const result = await this.prisma.baseInventario.update({
        where: {
          id: totalInvExists.id,
        },
        data,
      });

      const inventarios = await this.prisma.baseInventario.findMany({
        where: {
          baseNameInventario_id: id,
        },
        select: {
          status: true,
        },
      });

      const distinctStatus = inventarios
        .map((inventario) => inventario.status)
        .filter((value, index, array) => array.indexOf(value) === index);

      if (distinctStatus.length === 1) {
        await this.prisma.baseNameInventario.update({
          where: {
            id,
          },
          data: {
            status: true,
          },
        });
      }

      return result;
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }
}
