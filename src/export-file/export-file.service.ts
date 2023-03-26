import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as XLSX from 'xlsx';
import { join } from 'path';
import { convertDate } from 'src/utils/convertDate';

@Injectable()
export class ExportFileService {
  constructor(private readonly prisma: PrismaService) {}

  async exportFicha(id: string, @Res() res: Response) {
    const nameInvExists = await this.prisma.baseNameInventario.findUnique({
      where: {
        id: id,
      },
    });

    if (!nameInvExists) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    const baseInvExists = await this.prisma.baseInventario.findMany({
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
        saldoFisico: true,
      },
    });

    if (baseInvExists.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    const newDate = convertDate(nameInvExists.date);

    const ws = XLSX.utils.json_to_sheet(baseInvExists);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'ficha.xlsx');

    const file = join(__dirname, '..', '..', 'ficha.xlsx');
    res.download(file, `ficha_${nameInvExists.name}-${newDate}.xlsx`);

    return baseInvExists;
  }
}
