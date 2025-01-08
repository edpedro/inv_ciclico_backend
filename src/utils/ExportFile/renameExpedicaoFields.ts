import { ListBaseNotafiscalDto } from 'src/base-notafiscal/dto/list-base-notafiscal.dto';

const FIELD_NAMES = {
  codigo: 'Codigo',
  description: 'Descricao',
  quantityNF: 'QuantidadeNF',
  quantityPhysical: 'Fisico',
  number: 'Nota Fiscal',
  supply: 'Fornecimento',
  status: 'Status',
  conference_user: 'Usuario',
};

export async function renameExpedicaoFields(results: ListBaseNotafiscalDto[]) {
  return results.map((result) => {
    return Object.fromEntries(
      Object.entries(result)
        .filter(([key]) => FIELD_NAMES[key])
        .map(([key, value]) => [FIELD_NAMES[key], value]),
    );
  });
}
