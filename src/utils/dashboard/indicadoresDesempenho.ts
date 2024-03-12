import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
import { Acuracidade } from './acuracidade';
import { DivergeciasAcertos } from './divergeciasAcertos';
import { RemoveDuplicatesEndereco } from './removeDuplicatesEndereco';
import { RemoveDuplicatesItem } from './removeDuplicatesItem';
import { TotalEndereco } from './totalEndereco';
import { TotalSku } from './totalSku';

export async function IndicadoresDesempenho(data: ListDashboardDto[]) {
  const end = [
    'ARM A',
    'ARM B',
    'ARM C',
    'ARM D',
    'ARM E',
    'ARM F',
    'ARM G',
    'ARM H',
    'E BLOC 1',
    'E BLOC 2',
    'E BLOC 3',
    'E BLOC 4',
    'E BLOC 5',
    'DOCA 5',
  ];

  const indicadorDesem = [];

  for (let index = 0; index < end.length; index++) {
    const filter = data.filter((item) => {
      const itemAddress = item.endereco.substring(0, end[index].length);
      return itemAddress === end[index];
    });

    const removeDuplicatesItem = await RemoveDuplicatesItem(filter);

    const totalSKU = await TotalSku(removeDuplicatesItem);

    const removeDuplicatesEndereco = await RemoveDuplicatesEndereco(filter);

    const totalEndereco = TotalEndereco(removeDuplicatesEndereco);

    const { totalDivergencia } = await DivergeciasAcertos(data);

    const { acuracidade } = await Acuracidade(filter, totalDivergencia);

    indicadorDesem.push({
      Endereco: end[index],
      TotalEnd: totalEndereco,
      TotalSkus: totalSKU,
      Acuracidade: acuracidade,
    });
  }

  const indicadorDesemFiltrado = indicadorDesem.filter((item) => {
    return item.TotalEnd > 0 && !isNaN(item.Acuracidade);
  });

  return indicadorDesemFiltrado;
}
