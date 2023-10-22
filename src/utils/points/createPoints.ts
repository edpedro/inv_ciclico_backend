import { ListBaseInventarioDto } from './../../base-inventario/dto/list-base-inventario.dto';
import { UserDto } from 'src/users/dto/user.dto';

export async function createPoints(
  user: UserDto[],
  baseInvExists: ListBaseInventarioDto[],
) {
  const pointsArray = user.map((userData) => {
    let totalSKU = 0;
    let totalPrimeiraContagem = 0;
    let totalSegundaContagem = 0;

    baseInvExists.forEach((baseData) => {
      if (baseData.username_id === userData.id) {
        totalSKU++;

        if (baseData.secondCount !== null) {
          totalSegundaContagem++;
        } else {
          totalPrimeiraContagem++;
        }
      }
    });

    const totalPoints = totalPrimeiraContagem - totalSegundaContagem;

    return {
      id: userData.id,
      name: userData.name,
      username: userData.username,
      role: userData.role,
      totalPoints,
    };
  });

  pointsArray.sort((a, b) => b.totalPoints - a.totalPoints);

  return pointsArray;
}
