import { ListBaseInventarioDto } from 'src/base-inventario/dto/list-base-inventario.dto';

export async function AnalyzeCount(
  data: ListBaseInventarioDto[],
): Promise<ListBaseInventarioDto[]> {
  //retorna todos firstStatus false
  //verificar se todos firstStatus estão true
  //so retorna secondStatus se todos firstStatus estão true

  const statusKey = data.every((status) => status.firstStatus === true)
    ? 'secondStatus'
    : 'firstStatus';
  return data.filter((inv) => inv[statusKey] === false);
}
