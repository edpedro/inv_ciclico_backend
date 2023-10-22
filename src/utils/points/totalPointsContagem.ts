import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
export async function TotalPointsContagem(data: ListDashboardDto[]) {
  // total de 2 segunda contagem
  let totalSegundaContagem = 0;
  //Total de 1 contagem
  let totalPrimeiraContagem = 0;

  data.forEach((value) => {
    if (value.secondCount !== null) {
      totalSegundaContagem = totalSegundaContagem + 1;
    } else {
      totalPrimeiraContagem = totalPrimeiraContagem + 1;
    }
  });

  return { totalSegundaContagem, totalPrimeiraContagem };
}
