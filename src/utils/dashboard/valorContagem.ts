import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
export async function ValorContagem(data: ListDashboardDto[]) {
  const result = data.reduce((acc, curr) => {
    return acc + curr.saldoWms * curr.price;
  }, 0);
  const valorTotal = result.toFixed(2);

  return valorTotal;
}
