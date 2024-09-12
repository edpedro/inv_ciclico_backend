import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';

export async function Acuracidade(
  data: ListDashboardDto[],
  totalDivergencia: number,
): Promise<{
  acuracidade: number;
  totalSomaWms: number;
  totalSomaContagem: number;
}> {
  const { totalSomaWms, totalSomaContagem } = data.reduce(
    (accumulator, currentValue) => {
      const saldoTotal = currentValue.secondCount ?? currentValue.firstCount;
      return {
        totalSomaWms: accumulator.totalSomaWms + currentValue.saldoWms,
        totalSomaContagem: accumulator.totalSomaContagem + saldoTotal,
      };
    },
    { totalSomaWms: 0, totalSomaContagem: 0 },
  );

  const porcentagem =
    (Math.min(totalSomaWms, totalSomaContagem) /
      Math.max(totalSomaWms, totalSomaContagem)) *
    100;
  let acuracidade = Number((Math.floor(porcentagem * 100) / 100).toFixed(2));

  if (totalDivergencia > 0 && acuracidade === 100) {
    acuracidade = 99.99;
  }

  return { acuracidade, totalSomaWms, totalSomaContagem };
}
