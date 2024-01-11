import { ListBaseInventarioDto } from './../../base-inventario/dto/list-base-inventario.dto';

export async function filterPointsYear(baseInvExists: ListBaseInventarioDto[]) {
  const filterYears = baseInvExists.filter(
    (date) => new Date(date.created_at).getFullYear() === 2024,
  );

  return filterYears;
}
