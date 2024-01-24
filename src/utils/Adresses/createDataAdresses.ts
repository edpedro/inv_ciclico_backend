import { ListAdressDto } from 'src/adresses/dto/list-adress.dto';
import { ListBaseInventarioDto } from 'src/base-inventario/dto/list-base-inventario.dto';

export async function createDataAdresses(
  adresses: ListAdressDto[],
  data: ListBaseInventarioDto[],
) {
  const newData = data.map((inv) => {
    const match = adresses.find(
      (adress) => adress.descriptionAdress === inv.endereco,
    );
    if (match) {
      return {
        codeEnd: match.codeAdress,
        ...inv,
      };
    } else {
      return { ...inv };
    }
  });

  return newData;
}
