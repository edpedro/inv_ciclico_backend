import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { CreateBaseExpedicaoDto } from '../dto/create-base-expedicao.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { ListBaseExpedicaoDto } from '../dto/list-base-expedicao.dto';
import { UpdateBaseExpedicaoDto } from '../dto/update-base-expedicao.dto';

@Injectable()
export class BaseExpedicaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createExpedicaoDB(data: CreateBaseExpedicaoDto, req: ReqUserDto) {
    return await this.prisma.baseExpedicao.create({
      data: {
        name: data.name,
        date: data.date,
        create_id: req.user.id,
      },
    });
  }
  async findName(name: string): Promise<ListBaseExpedicaoDto> {
    return await this.prisma.baseExpedicao.findFirst({
      where: {
        name,
      },
    });
  }

  async findNameId(
    id: string,
    userId: string,
  ): Promise<ListBaseExpedicaoDto[]> {
    return await this.prisma.baseExpedicao.findMany({
      where: {
        id,
      },
    });
  }

  async findListExpedicao(id: string[]): Promise<ListBaseExpedicaoDto[]> {
    return await this.prisma.baseExpedicao.findMany({
      where: {
        create_id: {
          in: id,
        },
      },
      orderBy: {
        date: 'desc',
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

  async update(
    data: UpdateBaseExpedicaoDto,
    id: string,
  ): Promise<ListBaseExpedicaoDto> {
    return await this.prisma.baseExpedicao.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateStatus(
    status: string,
    id: string,
  ): Promise<ListBaseExpedicaoDto> {
    return await this.prisma.baseExpedicao.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });
  }

  async updatePDF(pdf: boolean, id: string): Promise<ListBaseExpedicaoDto> {
    return await this.prisma.baseExpedicao.update({
      where: {
        id,
      },
      data: {
        uploadPDF: pdf,
      },
    });
  }

  async updateExcel(excel: boolean, id: string): Promise<ListBaseExpedicaoDto> {
    return await this.prisma.baseExpedicao.update({
      where: {
        id,
      },
      data: {
        uploadPDF: excel,
      },
    });
  }

  async updateDate(
    dateCurrent: string,
    id: string,
  ): Promise<ListBaseExpedicaoDto> {
    return await this.prisma.baseExpedicao.update({
      where: {
        id,
      },
      data: {
        updated_at: dateCurrent,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.baseExpedicao.delete({
      where: {
        id,
      },
    });
  }

  async updateBlocked(
    status: boolean,
    id: string,
  ): Promise<ListBaseExpedicaoDto> {
    return await this.prisma.baseExpedicao.update({
      where: {
        id,
      },
      data: {
        blocked: status,
      },
    });
  }
}
