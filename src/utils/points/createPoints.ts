import { ListBaseInventarioDto } from './../../base-inventario/dto/list-base-inventario.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { filterPointsYear } from './filterPointsYear';

export async function createPoints(
  user: UserDto[],
  baseInvExists: ListBaseInventarioDto[],
) {
  const filterYear2024 = await filterPointsYear(baseInvExists);

  const pointsArray = Object.values(user).map((userData) => {
    const totals = filterYear2024.reduce(
      (acc, baseData) => {
        if (baseData.username_id === userData.id) {
          acc.totalSKU++;
          if (baseData.secondCount !== null) {
            acc.totalSegundaContagem++;
          } else {
            acc.totalPrimeiraContagem++;
          }
        }
        return acc;
      },
      { totalSKU: 0, totalPrimeiraContagem: 0, totalSegundaContagem: 0 },
    );

    const somaTotal =
      totals.totalPrimeiraContagem + totals.totalSegundaContagem;
    const pocentagem = 100 - (totals.totalSegundaContagem * 100) / somaTotal;
    const totalPoints = Number(((somaTotal * pocentagem) / 100).toFixed(2));

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
