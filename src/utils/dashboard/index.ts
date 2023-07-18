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

  const { evolucaoContagem } = await Evolucao(
    removeDuplicatesEndereco,
    totalEndereco,
  );

  const { acuracidade, totalSomaContagem, totalSomaWms } = await Acuracidade(
    data,
    totalDivergencia,
  );

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
  };
}
