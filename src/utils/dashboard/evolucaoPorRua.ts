import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
import { Evolucao } from './evolucao';
import { RemoveDuplicatesEndereco } from './removeDuplicatesEndereco';
import { TotalEndereco } from './totalEndereco';

export async function EvolucaoPorRua(data: ListDashboardDto[]) {
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

  const evolucaoRua = [];

  for (let index = 0; index < end.length; index++) {
    const filter = data.filter((item) => {
      const itemAddress = item.endereco.substring(0, end[index].length);
      return itemAddress === end[index];
    });

    const removeDuplicatesEndereco = await RemoveDuplicatesEndereco(filter);

    const totalEndereco = TotalEndereco(removeDuplicatesEndereco);

    const { evolucaoContagem } = await Evolucao(filter, totalEndereco);

    const evol = parseFloat(evolucaoContagem); // Convertendo para número
    const evolDecimais = Math.floor(evol); // Removendo os números após o ponto decimal

    evolucaoRua.push({
      Rua: end[index],
      EvolRua: evolDecimais,
    });
  }

  const evolucaoRuaFilter = evolucaoRua.filter((item) => {
    return item.EvolRua > 0 && !isNaN(item.EvolRua);
  });

  return evolucaoRuaFilter;
}
