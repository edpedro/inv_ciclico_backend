import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const resultDash = await this.prisma.baseInventario.findMany();

    //Total SKU
    const duplicatedSKUs = new Set();

    const filterSKUs = resultDash.filter((sku) => {
      const duplicated = duplicatedSKUs.has(sku.item);
      duplicatedSKUs.add(sku.item);
      return !duplicated;
    });

    const totalSku = filterSKUs.reduce((acc) => {
      return acc + 1;
    }, 0);

    //Total de Endereço
    const duplicatedEndereco = new Set();

    const filterEndereco = resultDash.filter((sku) => {
      const duplicated = duplicatedEndereco.has(sku.endereco);
      duplicatedEndereco.add(sku.endereco);
      return !duplicated;
    });

    const totalEndereco = filterEndereco.reduce((acc) => {
      return acc + 1;
    }, 0);

    return resultDash;
  }
}
