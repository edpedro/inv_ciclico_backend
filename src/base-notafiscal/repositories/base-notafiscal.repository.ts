import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBaseNotafiscalDto } from '../dto/create-base-notafiscal.dto';
import { ListBaseNotafiscalDto } from '../dto/list-base-notafiscal.dto';
import { UpdateBaseNotafiscalDto } from '../dto/update-base-notafiscal.dto';

@Injectable()
export class BaseNotaFiscalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async uploadNotaFiscal(data: CreateBaseNotafiscalDto[]) {
    return await this.prisma.baseNotaFiscal.createMany({
      data,
    });
  }

  async findNumber(numberNF: string) {
    return await this.prisma.baseNotaFiscal.findFirst({
      where: {
        number: numberNF,
      },
    });
  }

  async findIdNotaFiscal(id: number) {
    return await this.prisma.baseNotaFiscal.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findAllExpedicaoNotaFiscal(id: string) {
    return await this.prisma.baseNotaFiscal.findFirst({
      where: {
        baseExpedicao_id: id,
      },
    });
  }

  async findListNotaFiscal(id: string[]): Promise<ListBaseNotafiscalDto[]> {
    return await this.prisma.baseNotaFiscal.findMany({
      where: {
        user_id: {
          in: id,
        },
      },
      orderBy: {
        created_at: 'asc',
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

  async findIdExpedicao(idExpedicao: string): Promise<ListBaseNotafiscalDto[]> {
    return await this.prisma.baseNotaFiscal.findMany({
      where: {
        baseExpedicao_id: idExpedicao,
      },
      orderBy: {
        created_at: 'asc',
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

  async removeNotaFiscal(idExpedicao: string, idUser: string) {
    return await this.prisma.baseNotaFiscal.deleteMany({
      where: {
        baseExpedicao_id: idExpedicao,
        user_id: idUser,
      },
    });
  }

  async removerNumberNotaFiscal(number: string, idUser: string) {
    return await this.prisma.baseNotaFiscal.deleteMany({
      where: {
        number: number,
        user_id: idUser,
      },
    });
  }

  async updateConference(data: UpdateBaseNotafiscalDto, id: number) {
    return await this.prisma.baseNotaFiscal.update({
      where: {
        id: id,
      },
      data,
    });
  }
}
