import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
import { Acuracidade } from './acuracidade';
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
    'E ARM H',
    'E ARM G',
    'E OSP BLOC 1',
    'E OSP BLOC 2',
    'E OSP BLOC 3',
    'E OSP BLOC 4',
    'E OSP BLOC 5',
    'E OSP BLOC 6',
    'E OSP BLOC 7',
    'E OSP BLOC 8',
    'E OSP BLOC 9',
    'E OSP BLOC 10',
    'E BLOC 1',
    'E BLOC 2',
    'E BLOC 3',
    'E BLOC 4',
    'E BLOC 5',
    'E BLOC 6',
    'E BLOC 7',
    'E BLOC 8',
    'E BLOC 9',
    'E BLOC 10',
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

    const { acuracidade } = await Acuracidade(filter, 0);

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
