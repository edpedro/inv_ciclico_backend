import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
export async function RemoveDuplicatesEndereco(data: ListDashboardDto[]) {
  const removeDuplicatesEndereco = Array.from(
    new Set(data.map((d) => d.endereco)),
  ).map((endereco) => {
    return data.find((value) => value.endereco === endereco);
  });

  return removeDuplicatesEndereco;
}
