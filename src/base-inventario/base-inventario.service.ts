import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadDto } from 'src/utils/file-upload.dto';
import { CreateBaseInventarioDto } from './dto/create-base-inventario.dto';
import * as XLSX from 'xlsx';
import { UpdateBaseInventarioDto } from './dto/update-base-inventario.dto copy';
import { ListEnderecoDto } from './dto/list-endereco.dto';
import { ListItemDto } from './dto/list-item.dto';
import { UpdateWmsInventarioDto } from './dto/update-wms-inventario.dto';
import { ListItemHistoricoDto } from './dto/list-historico.item.dto copy';

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
        create_id: req.user.id,
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

    if (baseInvExists.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    return baseInvExists;
  }

  async listTotalEndereco(id: string) {
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
        enderecoExistente.firstStatus =
          enderecoExistente.firstStatus && item.firstStatus;
        enderecoExistente.secondStatus =
          enderecoExistente.secondStatus && item.secondStatus;
      } else {
        acc.push({
          id: item.id,
          endereco: item.endereco,
          item: 1,
          firstStatus: item.firstStatus,
          secondStatus: item.secondStatus,
          baseNameInventario_id: item.baseNameInventario_id,
        });
      }

      return acc;
    }, []);

    return resultado;
  }

  async listEndereco(data: ListEnderecoDto, id: string) {
    const baseInvExists = await this.prisma.baseInventario.findMany({
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

    if (baseInvExists.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    return baseInvExists;
  }

  async listItem(data: ListItemDto, id: string) {
    const baseInvExists = await this.prisma.baseInventario.findMany({
      where: {
        baseNameInventario_id: id,
        id: data.id,
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

  async remove(id: string, req: any) {
    try {
      const nameInvExists = await this.prisma.baseNameInventario.findFirst({
        where: {
          id,
          create_id: req.user.id,
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
          firstStatus: false,
          secondStatus: null,
        },
      });

      return result;
    } catch (error) {
      throw new HttpException('Dados não deletado', HttpStatus.BAD_REQUEST);
    }
  }

  async update(data: UpdateBaseInventarioDto, id: string, req: any) {
    try {
      const nameInvExists = await this.prisma.nameInventarioOnUsers.findFirst({
        where: {
          user_id: req.user.id,
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
        throw new HttpException(
          'Dados não encontrados',
          HttpStatus.BAD_REQUEST,
        );
      }

      let newData: CreateBaseInventarioDto;

      if (totalInvExists.firstStatus === false) {
        const secondStatus =
          totalInvExists.saldoWms !== data.saldoFisico ? false : true;

        const updateFirst = await this.prisma.baseInventario.update({
          where: {
            id: totalInvExists.id,
          },
          data: {
            firstCount: data.saldoFisico,
            firstStatus: true,
            secondStatus,
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
        newData = updateFirst;
      } else {
        if (totalInvExists.secondStatus === false) {
          const updateSecond = await this.prisma.baseInventario.update({
            where: {
              id: totalInvExists.id,
            },
            data: {
              secondCount: data.saldoFisico,
              secondStatus: true,
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
          newData = updateSecond;
        }
      }

      const inventarios = await this.prisma.baseInventario.findMany({
        where: {
          baseNameInventario_id: id,
        },
        select: {
          firstStatus: true,
          secondStatus: true,
        },
      });

      const resultfirstStatus = inventarios.every((inventario) => {
        return inventario.firstStatus;
      });

      if (resultfirstStatus) {
        await this.prisma.baseNameInventario.update({
          where: {
            id,
          },
          data: {
            firstStatus: true,
            secondStatus: false,
          },
        });
      }

      const resultsecondStatus = inventarios.every((inventario) => {
        return inventario.secondStatus;
      });

      if (resultsecondStatus) {
        await this.prisma.baseNameInventario.update({
          where: {
            id,
          },
          data: {
            secondStatus: true,
          },
        });
      }
      return newData;
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }

  async updateAdminSecondCount(
    data: UpdateBaseInventarioDto,
    id: string,
    req: any,
  ) {
    try {
      const nameInvExists = await this.prisma.baseNameInventario.findFirst({
        where: {
          create_id: req.user.id,
        },
      });

      if (!nameInvExists) {
        throw new HttpException(
          'Atualização não autorizada',
          HttpStatus.BAD_REQUEST,
        );
      }

      const totalInvExists = await this.prisma.baseInventario.findUnique({
        where: {
          id: data.id,
        },
      });

      if (!totalInvExists) {
        throw new HttpException(
          'Dados não encontrados',
          HttpStatus.BAD_REQUEST,
        );
      }

      let newData: CreateBaseInventarioDto;

      if (totalInvExists.secondStatus !== true) {
        throw new HttpException(
          'Atualização não autorizada',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (totalInvExists.secondStatus === true) {
        const updateSecond = await this.prisma.baseInventario.update({
          where: {
            id: totalInvExists.id,
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
        newData = updateSecond;
      }

      return newData;
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }

  async updateAdminWMS(data: UpdateWmsInventarioDto, id: string, req: any) {
    try {
      const nameInvExists = await this.prisma.baseNameInventario.findFirst({
        where: {
          create_id: req.user.id,
        },
      });

      if (!nameInvExists) {
        throw new HttpException(
          'Atualização não autorizada',
          HttpStatus.BAD_REQUEST,
        );
      }

      const totalInvExists = await this.prisma.baseInventario.findUnique({
        where: {
          id: data.id,
        },
      });

      if (!totalInvExists) {
        throw new HttpException(
          'Dados não encontrados',
          HttpStatus.BAD_REQUEST,
        );
      }
      const updateSecond = await this.prisma.baseInventario.update({
        where: {
          id: totalInvExists.id,
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

      return updateSecond;
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }

  async historicoGetItemAll(data: ListItemHistoricoDto, id: string, req: any) {
    try {
      const nameInvExists = await this.prisma.baseNameInventario.findFirst({
        where: {
          create_id: req.user.id,
        },
      });

      if (!nameInvExists) {
        throw new HttpException(
          'Atualização não autorizada',
          HttpStatus.BAD_REQUEST,
        );
      }

      const totalInvExists = await this.prisma.baseInventario.findMany({
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
        },
      });

      return totalInvExists;
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }
}
