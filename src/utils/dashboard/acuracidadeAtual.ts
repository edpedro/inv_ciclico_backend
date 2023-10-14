import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';

export async function AcuracidadeAtual(
  data: ListDashboardDto[],
  totalDivergencia: number,
): Promise<{ acuracidadeAtual: number }> {
  // Acuracidade
  const mapearDados = data.map((dado) => {
    const saldoTotalFisico = dado.secondCount
      ? dado.secondCount
      : dado.firstCount;
    const saldoTotalWMS = dado.firstCount ? dado.saldoWms : 0;
    return { ...dado, saldoTotalFisico, saldoTotalWMS };
  });

  const { totalSomaWms, totalSomaContagem } = mapearDados.reduce(
    (acc, current) => ({
      totalSomaWms: acc.totalSomaWms + current.saldoTotalWMS,
      totalSomaContagem:
        acc.totalSomaContagem + Number(current.saldoTotalFisico || 0),
    }),
    { totalSomaWms: 0, totalSomaContagem: 0 },
  );

  //Pocentagem
  const porcentagem =
    totalSomaWms >= totalSomaContagem
      ? (totalSomaContagem / totalSomaWms) * 100
      : (totalSomaWms / totalSomaContagem) * 100;

  const acuracidadeAtual =
    totalDivergencia > 0 && porcentagem === 100
      ? 99.99
      : Math.floor(porcentagem * 100) / 100;

  return { acuracidadeAtual };
}
