import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DashboardCreate } from '../../utils/dashboard/index';
import { ListAllBaseInventarioUseCase } from 'src/base-inventario/usecases/list-all-inventario.usecase';

@Injectable()
export class DashboardService {
  constructor(
    private readonly listAllBaseInventarioUseCase: ListAllBaseInventarioUseCase,
  ) {}

  async findIdInve(id: string) {
    const resultDash = await this.listAllBaseInventarioUseCase.execute(id);

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
      acuracidadeAtual,
      valorTotal,
      tempoInventario,
      usersPoints,
      indicadorDesempenho,
      evolucaoPorRua,
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
      acuracidadeAtual,
      valorTotal,
      tempoInventario,
      usersPoints,
      indicadorDesempenho,
      evolucaoPorRua,
    };
  }
}
