import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { DashboardCreate } from '../utils/dashboard/index';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async findIdInve(id: string) {
    const resultDash = await this.prisma.baseInventario.findMany({
      where: { baseNameInventario_id: id },
    });

    if (resultDash.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    const {
      totalSKU,
      totalEndereco,
      totalPrimeiraContagem,
      totalSegundaContagem,
      totalSomaDivergencias,
      totalFalta,
      totalSobra,
      totalAcertos,
      totalDivergencia,
      evolucaoContagem,
      acuracidade,
      totalSomaContagem,
      totalSomaWms,
    } = await DashboardCreate(resultDash);

    return {
      totalSKU,
      totalEndereco,
      acuracidade,
      totalSegundaContagem,
      totalPrimeiraContagem,
      totalSomaDivergencias,
      totalSomaWms,
      totalSomaContagem,
      totalFalta,
      totalSobra,
      totalDivergencia,
      totalAcertos,
      evolucaoContagem,
    };
  }
}
