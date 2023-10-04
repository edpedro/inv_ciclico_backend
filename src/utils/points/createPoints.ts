import { ListBaseInventarioDto } from './../../base-inventario/dto/list-base-inventario.dto';
import { UserDto } from 'src/users/dto/user.dto';

export async function createPoints(
  user: UserDto[],
  baseInvExists: ListBaseInventarioDto[],
) {
  const pointsArray = user.map((userData) => {
    let totalSKU = 0;
    let totalSegundaContagem = 0;
    let divergenciaArray = [];

    baseInvExists.forEach((baseData) => {
      if (baseData.username_id === userData.id) {
        totalSKU++;

        if (baseData.secondCount !== null) {
          totalSegundaContagem++;
        }

        if (
          baseData.secondCount &&
          baseData.secondCount !== baseData.saldoWms
        ) {
          divergenciaArray.push(baseData.item);
        }
      }
    });

    const uniqueArrayDivergencia = [...new Set(divergenciaArray)];
    const totalDivergencia = uniqueArrayDivergencia.length;
    const totalAcertos = totalSKU - totalDivergencia;
    const totalPoints = totalAcertos - totalSegundaContagem;

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
