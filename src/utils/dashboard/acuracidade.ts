import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
export async function Acuracidade(
  data: ListDashboardDto[],
  totalDivergencia: number,
) {
  // Acuracidade
  //verificar se exister contagem 2, se sim passa para 1 contagem
  const updatedArr = data.map((value) => {
    if (value.secondCount) {
      return { ...value, saldoTotal: value.secondCount };
    } else {
      return { ...value, saldoTotal: value.firstCount };
    }
  });

  // somando valor do WMS com total das contagens
  const { totalSomaWms, totalSomaContagem } = updatedArr.reduce(
    (accumulator, currentValue) => {
      return {
        totalSomaWms: accumulator.totalSomaWms + currentValue.saldoWms,
        totalSomaContagem:
          accumulator.totalSomaContagem + currentValue.saldoTotal,
      };
    },
    { totalSomaWms: 0, totalSomaContagem: 0 },
  );

  //Pocentagem
  let porcentagem = 0;

  if (totalSomaWms >= totalSomaContagem) {
    porcentagem = (totalSomaContagem / totalSomaWms) * 100;
  } else {
    porcentagem = (totalSomaWms / totalSomaContagem) * 100;
  }

  let acuracidade = Math.floor(porcentagem * 100) / 100;

  if (totalDivergencia > 0 && acuracidade === 100) {
    acuracidade = 99.99;
  }

  return { acuracidade, totalSomaWms, totalSomaContagem };
}
