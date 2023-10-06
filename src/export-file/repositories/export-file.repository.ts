import { ListBaseInventarioDto } from './../../base-inventario/dto/list-base-inventario.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
