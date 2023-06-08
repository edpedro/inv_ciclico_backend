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
    const totalEndereco = removeDuplicatesEndereco.reduce((acc) => {
      return acc + 1;
    }, 0);

    // Acuracidade
    //verificar se exister contagem 2, se sim passa para 1 contagem

    const updatedArr = removeDuplicatesEndereco.map((value) => {
      if (value.secondCount) {
        return { ...value, saldoTotal: value.secondCount };
      } else {
        return { ...value, saldoTotal: value.firstCount };
      }
    });

    // somando valor do WMS com total das contagens
    const { totalSomaWms, totalSomaContagem } = updatedArr.reduce(
      (accumulator, currentValue) => {
        return {
          totalSomaWms: accumulator.totalSomaWms + currentValue.saldoWms,
          totalSomaContagem:
            accumulator.totalSomaContagem + currentValue.saldoTotal,
        };
      },
      { totalSomaWms: 0, totalSomaContagem: 0 },
    );

    let pocentagem = 0;
    // pocentagem
    if (totalSomaWms >= totalSomaContagem) {
      pocentagem = (totalSomaContagem / totalSomaWms) * 100;
    } else {
      pocentagem = (totalSomaWms / totalSomaContagem) * 100;
    }
    const acuracidade = pocentagem.toFixed(2);

    // total de 2 segunda contagem
    let totalSegundaContagem = 0;
    //Total de 1 contagem
    let totalPrimeiraContagem = 0;

    resultDash.forEach((value) => {
      if (value.secondCount !== null) {
        totalSegundaContagem = totalSegundaContagem + 1;
      }
      if (value.firstCount !== null) {
        totalPrimeiraContagem = totalPrimeiraContagem + 1;
      }
    });

    //Total de Falta e Sobra
    let totalFalta = 0;
    let totalSobra = 0;

    resultDash.forEach((inv) => {
      if (inv.secondCount !== null) {
        const saldo = inv.secondCount - inv.saldoWms;

        if (saldo > 0) {
          totalSobra += saldo;
        } else if (saldo < 0) {
          totalFalta += Math.abs(saldo);
        }
      } else {
        if (inv.firstCount !== null) {
          const saldo = inv.firstCount - inv.saldoWms;

          if (saldo > 0) {
            totalSobra += saldo;
          } else if (saldo < 0) {
            totalFalta += Math.abs(saldo);
          }
        }
      }
    });

    //soma total de divergencias
    const totalSomaDivergencias = totalFalta + totalSobra;

    //Total de Divergencia e Acertos
    const acertosArray = [];
    const divergenciaArray = [];

    resultDash.forEach((value) => {
      if (value.secondCount) {
        if (
          value.secondCount > value.saldoWms ||
          value.secondCount < value.saldoWms
        ) {
          divergenciaArray.push(value.item);
        } else if (value.secondCount === value.saldoWms) {
          acertosArray.push(value.item);
        }
      } else if (value.firstCount === value.saldoWms) {
        acertosArray.push(value.item);
      }
    });
    const uniqueArrayAcertos = acertosArray.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    const uniqueArrayDivergencia = divergenciaArray.filter(
      (value, index, self) => {
        return self.indexOf(value) === index;
      },
    );

    let totalDivergencia = uniqueArrayDivergencia.length;
    let totalAcertos = uniqueArrayAcertos.length;

    totalAcertos = totalAcertos - totalDivergencia;

    //Evolução 1 contagem
    let evoluc = 0;

    removeDuplicatesEndereco.forEach((value) => {
      if (value.firstCount !== null) {
        evoluc = evoluc + 1;
      }
    });

    let evolucao = 0;
    // pocentagem
    if (totalEndereco >= evoluc) {
      evolucao = (evoluc / totalEndereco) * 100;
    } else {
      evolucao = (totalEndereco / evoluc) * 100;
    }
    const evolucaoContagem = evolucao.toFixed(2);

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
