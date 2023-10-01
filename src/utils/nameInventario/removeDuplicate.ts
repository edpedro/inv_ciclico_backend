import { UpdateNameInventarioDto } from './../../name-inventario/dto/update-name-inventario.dto';
import { CreateNameInventarioDto } from 'src/name-inventario/dto/create-name-inventario.dto';

export async function RemoveDuplicate(
  data: CreateNameInventarioDto | UpdateNameInventarioDto,
) {
  if (data.user_id) {
    return data.user_id.filter(
      (item, index) => data.user_id.indexOf(item) === index,
    );
  }
  return data;
}
