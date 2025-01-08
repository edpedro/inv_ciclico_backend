import { ListBaseInventarioDto } from './../../base-inventario/dto/list-base-inventario.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListProtocolExportFileDto } from '../dto/list-protocols-export-file.dto';
import { ListBaseExpedicaoDto } from 'src/base-expedicao/dto/list-base-expedicao.dto';

@Injectable()
export class ExportFileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllInventario(id: string): Promise<ListBaseInventarioDto[]> {
    return await this.prisma.baseInventario.findMany({
      where: {
        baseNameInventario_id: id,
      },
      orderBy: {
        endereco: 'asc',
      },
      select: {
        item: true,
        descricao: true,
        endereco: true,
        tipoEstoque: true,
        catItem: true,
        saldoWms: true,
        firstCount: true,
        secondCount: true,
        username_id: true,
      },
    });
  }

  // async findAProtocol(id: string): Promise<ListProtocolExportFileDto[]> {
  //   return await this.prisma.protocols.findMany({
  //     where: {
  //       nameProtocols_id: id,
  //     },
  //     orderBy: {
  //       created_at: 'asc',
  //     },
  //     include: {
  //       nameProtocols: {
  //         select: {
  //           name: true,
  //           date: true,
  //         },
  //       },
  //     },
  //   });
  // }

  async findExpedicaoId(id: string): Promise<ListBaseExpedicaoDto> {
    return await this.prisma.baseExpedicao.findFirst({
      where: {
        id,
      },
    });
  }
}
