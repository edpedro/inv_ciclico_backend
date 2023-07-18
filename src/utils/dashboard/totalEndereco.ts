import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
export function TotalEndereco(data: ListDashboardDto[]): number {
  const totalEndereco = data.reduce((acc) => {
    return acc + 1;
  }, 0);

  return totalEndereco;
}
