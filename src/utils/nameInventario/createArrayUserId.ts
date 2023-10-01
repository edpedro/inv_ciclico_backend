import { CreateNameInventarioDto } from 'src/name-inventario/dto/create-name-inventario.dto';
import { RemoveDuplicate } from './removeDuplicate';

export async function createArrayUserId(data: CreateNameInventarioDto) {
  const arrayUserId = await RemoveDuplicate(data);

  if (!Array.isArray(arrayUserId)) {
    return [];
  }
  return arrayUserId.map((user_id) => ({
    user_id,
    assignedBy: 'auth',
  }));
}
