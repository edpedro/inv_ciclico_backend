import { ListDashboardDto } from 'src/dashboard/dto/list-dashboard.dto';
import { RemoveDuplicatesItem } from './removeDuplicatesItem';
import { TotalSku } from './totalSku';
import { RemoveDuplicatesEndereco } from './removeDuplicatesEndereco';
import { TotalEndereco } from './totalEndereco';
import { TotalContagem } from './totalContagem';
import { SobraFaltaSoma } from './sobraFaltaSoma';
import { DivergeciasAcertos } from './divergeciasAcertos';
import { Evolucao } from './evolucao';
import { Acuracidade } from './acuracidade';
import { AcuracidadeAtual } from './acuracidadeAtual';
import { ValorContagem } from './valorContagem';
import { TempoInventario } from './tempoInventario';
import { UsersPoints } from './usersPoints';
import { IndicadoresDesempenho } from './indicadoresDesempenho';

export async function DashboardCreate(data: ListDashboardDto[]) {
  const removeDuplicatesItem = await RemoveDuplicatesItem(data);

  const totalSKU = await TotalSku(removeDuplicatesItem);

  const removeDuplicatesEndereco = await RemoveDuplicatesEndereco(data);

  const totalEndereco = TotalEndereco(removeDuplicatesEndereco);

  const { totalPrimeiraContagem, totalSegundaContagem } = await TotalContagem(
    data,
  );

  const { totalSomaDivergencias, totalFalta, totalSobra } =
    await SobraFaltaSoma(data);

  const { totalAcertos, totalDivergencia } = await DivergeciasAcertos(data);

  const { evolucaoContagem } = await Evolucao(data, totalEndereco);

  const { acuracidade, totalSomaContagem, totalSomaWms } = await Acuracidade(
    data,
    totalDivergencia,
  );

  const { acuracidadeAtual } = await AcuracidadeAtual(data, totalDivergencia);

  const valorTotal = await ValorContagem(data);

  const tempoInventario = await TempoInventario(data);

  const usersPoints = await UsersPoints(data);

  const indicadorDesempenho = await IndicadoresDesempenho(data);

  return {
    totalSKU,
    removeDuplicatesEndereco,
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
  };
}
