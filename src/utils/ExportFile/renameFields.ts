import { ListBaseInventarioDto } from './../../base-inventario/dto/list-base-inventario.dto';

const FIELD_NAMES = {
  date: 'Data',
  user: 'Usuario',
  codigo: 'Codigo',
  serial: 'Serial',
  caixa: 'Caixa',
};

export async function renameFields(results: ListBaseInventarioDto[]) {
  return results.map((result) => {
    return Object.fromEntries(
      Object.entries(result)
        .filter(([key]) => FIELD_NAMES[key])
        .map(([key, value]) => [FIELD_NAMES[key], value]),
    );
  });
}
