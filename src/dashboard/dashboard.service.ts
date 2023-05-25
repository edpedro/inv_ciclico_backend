import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async findIdInve(id: string) {
    const resultDash = await this.prisma.baseInventario.findMany({
      where: { baseNameInventario_id: id },
    });

    //Remove Duplicados item
    const removeDuplicatesItem = Array.from(
      new Set(resultDash.map((d) => d.item)),
    ).map((item) => {
      return resultDash.find((value) => value.item === item);
    });

    // Total SKU
    const totalSKU = removeDuplicatesItem.reduce((acc) => {
      return acc + 1;
    }, 0);

    //Remove Duplicados endereco
    const removeDuplicatesEndereco = Array.from(
      new Set(resultDash.map((d) => d.endereco)),
    ).map((endereco) => {
      return resultDash.find((value) => value.endereco === endereco);
    });

    // Total Endereco
    const totalEnd = removeDuplicatesEndereco.reduce((acc) => {
      return acc + 1;
    }, 0);

    // Acuracidade
    //verificar se exister contagem 2, se sim passa para 1 contagem
    //Total de 1 contagem
    let totalFirstCount = 0;
    const updatedArr = resultDash.map((value) => {
      if (value.secondCount) {
        return { ...value, saldoTotal: value.secondCount };
      } else {
        totalFirstCount += 1;
        return { ...value, saldoTotal: value.firstCount };
      }
    });

    // somando valor do WMS com total das contagens
    const { totalSumWms, totalSumCount } = updatedArr.reduce(
      (accumulator, currentValue) => {
        return {
          totalSumWms: accumulator.totalSumWms + currentValue.saldoWms,
          totalSumCount: accumulator.totalSumCount + currentValue.saldoTotal,
        };
      },
      { totalSumWms: 0, totalSumCount: 0 },
    );

    let pocen = 0;
    // pocentagem
    if (totalSumWms >= totalSumCount) {
      pocen = (totalSumCount / totalSumWms) * 100;
    } else {
      pocen = (totalSumWms / totalSumCount) * 100;
    }
    const acurac = pocen.toFixed(2);

    // total de 2 segunda contagem
    let totalSecondCount = 0;
    resultDash.forEach((value) => {
      if (value.secondCount) {
        totalSecondCount += 1;
      }
      return totalSecondCount;
    });

    //Total de Falta e Sobra
    let totalFalt = 0;
    let totalSobr = 0;

    resultDash.forEach((value) => {
      if (value.secondCount) {
        if (value.secondCount > value.saldoWms) {
          totalSobr += value.secondCount - value.saldoWms;
        } else if (value.secondCount < value.saldoWms) {
          totalFalt += value.saldoWms - value.secondCount;
        }
      } else {
        if (value.firstCount > value.saldoWms) {
          totalSobr += value.firstCount - value.saldoWms;
        } else if (value.firstCount < value.saldoWms) {
          totalFalt += value.saldoWms - value.firstCount;
        }
      }
      return totalSecondCount;
    });

    //soma total de divergencias
    const totalSumDivergencias = totalFalt + totalSobr;

    //Total de Divergencia e Acertos
    let totalDiv = 0;
    let totalAcert = 0;

    resultDash.forEach((value) => {
      if (value.secondCount) {
        if (
          value.secondCount > value.saldoWms ||
          value.secondCount < value.saldoWms
        ) {
          totalDiv = totalDiv + 1;
        }
      } else {
        totalAcert = totalAcert + 1;
      }
      return totalSecondCount;
    });

    //Evolução 1 contagem
    let evoluEndFristCount = 0;

    removeDuplicatesEndereco.forEach((value) => {
      if (value.endereco) {
        evoluEndFristCount = evoluEndFristCount + 1;
      }
    });

    let evoluc = 0;
    // pocentagem
    if (totalEnd >= evoluEndFristCount) {
      evoluc = (evoluEndFristCount / totalEnd) * 100;
    } else {
      evoluc = (totalEnd / evoluEndFristCount) * 100;
    }
    const evoluEndFrist = evoluc.toFixed(2);

    return {
      totalSKU,
      totalEnd,
      acurac,
      totalSecondCount,
      totalFirstCount,
      totalSumDivergencias,
      totalSumWms,
      totalSumCount,
      totalFalt,
      totalSobr,
      totalDiv,
      totalAcert,
      evoluEndFrist,
    };
  }
}
