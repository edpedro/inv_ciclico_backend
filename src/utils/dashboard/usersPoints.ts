import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';

export async function UsersPoints(data: ListDashboardDto[]) {
  const users = data
    .filter((user) => user.user !== null && user.user.role !== 'admin')
    .reduce((acc, user) => {
      if (!acc[user.user.id]) {
        acc[user.user.id] = user.user;
      }
      return acc;
    }, {});

  const pointsArray = Object.values(users).map((userData) => {
    const totals = data.reduce(
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
      totalPoints,
    };
  });

  pointsArray.sort((a, b) => b.totalPoints - a.totalPoints);

  return pointsArray;
}
