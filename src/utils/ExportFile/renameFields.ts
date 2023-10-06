import { ListBaseInventarioDto } from './../../base-inventario/dto/list-base-inventario.dto';

const FIELD_NAMES = {
  item: 'Item',
  descricao: 'Descricao',
  endereco: 'Endereco',
  tipoEstoque: 'Tip.Estoque',
  catItem: 'Cat.Item',
  saldoWms: 'Dispon.Exped.',
  firstCount: 'Primeira Contagem',
  secondCount: 'Segunda Contagem',
  name: 'Usuário',
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
