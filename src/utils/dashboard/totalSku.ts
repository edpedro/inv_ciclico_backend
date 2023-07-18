import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
export async function TotalSku(data: ListDashboardDto[]) {
  const totalSKU = data.reduce((acc) => {
    return acc + 1;
  }, 0);

  return totalSKU;
}
