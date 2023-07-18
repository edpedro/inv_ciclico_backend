import { ListDashboardDto } from 'src/dashboard/dto/list-dashboard.dto';

export async function RemoveDuplicatesItem(data: ListDashboardDto[]) {
  const removeDuplicatesItem = Array.from(new Set(data.map((d) => d.item))).map(
    (item) => {
      return data.find((value) => value.item === item);
    },
  );

  return removeDuplicatesItem;
}
