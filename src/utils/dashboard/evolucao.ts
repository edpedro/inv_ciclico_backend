import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
export async function Evolucao(
  data: ListDashboardDto[],
  totalEndereco: number,
) {
  //Evolução 1 contagem
  let evoluc = 0;

  let enderecoMap = {};

  for (let i = 0; i < data.length; i++) {
    if (enderecoMap[data[i].endereco]) {
      enderecoMap[data[i].endereco].push(data[i].firstStatus);
    } else {
      enderecoMap[data[i].endereco] = [data[i].firstStatus];
    }
  }

  for (let endereco in enderecoMap) {
    if (enderecoMap[endereco].every((val) => val === true)) {
      evoluc++;
    }
  }

  //Evolução
  let evolucao = 0;
  // pocentagem
  if (totalEndereco >= evoluc) {
    evolucao = (evoluc / totalEndereco) * 100;
  } else {
    evolucao = (totalEndereco / evoluc) * 100;
  }
  const evolucaoContagem = evolucao.toFixed(2);

  return { evolucaoContagem };
}
