import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
import { RemoveDuplicatesEndereco } from './removeDuplicatesEndereco';
export function TotalEndereco(data: ListDashboardDto[]): number {
  //const removeDuplicadas = await RemoveDuplicatesEndereco(data);

  const totalEndereco = data.reduce((acc) => {
    return acc + 1;
  }, 0);

  return totalEndereco;
}
