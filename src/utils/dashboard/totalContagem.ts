import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
import { RemoveDuplicatesEndereco } from './removeDuplicatesEndereco';
export async function TotalContagem(data: ListDashboardDto[]) {
  // total de 2 segunda contagem
  let totalSegundaContagem = 0;
  //Total de 1 contagem
  let totalPrimeiraContagem = 0;

  const removeDuplicatesEndereco = await RemoveDuplicatesEndereco(data);

  removeDuplicatesEndereco.forEach((value) => {
    if (value.secondCount !== null) {
      totalSegundaContagem = totalSegundaContagem + 1;
    }
    if (value.firstCount !== null) {
      totalPrimeiraContagem = totalPrimeiraContagem + 1;
    }
  });

  return { totalSegundaContagem, totalPrimeiraContagem };
}
