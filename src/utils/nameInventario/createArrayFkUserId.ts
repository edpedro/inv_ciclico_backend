import { UpdateNameInventarioDto } from './../../name-inventario/dto/update-name-inventario.dto';
import { RemoveDuplicate } from './removeDuplicate';

export async function createArrayFkUserId(
  id: string,
  data: UpdateNameInventarioDto,
) {
  const arrayUserId = await RemoveDuplicate(data);

  if (!Array.isArray(arrayUserId)) {
    return [];
  }
  return arrayUserId.map((user_id) => ({
    nameInventario_id: id,
    user_id,
    assignedBy: 'auth',
  }));
}
