import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
export async function Evolucao(
  data: ListDashboardDto[],
  totalEndereco: number,
) {
  //Evolução 1 contagem
  let evoluc = 0;

  data.forEach((value) => {
    if (value.firstCount !== null) {
      evoluc = evoluc + 1;
    }
  });

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
