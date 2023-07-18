import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
export async function DivergeciasAcertos(data: ListDashboardDto[]) {
  //Total de Divergencia e Acertos
  const divergenciaArray = [];

  data.forEach((value) => {
    if (value.secondStatus === false && value.firstStatus === true) {
      if (
        value.secondCount > value.saldoWms ||
        value.secondCount < value.saldoWms
      ) {
        divergenciaArray.push(value.item);
      }
    }

    if (value.secondStatus === true && value.firstStatus === true) {
      if (value.secondCount === value.saldoWms) {
        divergenciaArray.push();
      } else if (value.firstCount !== value.saldoWms) {
        divergenciaArray.push(value.item);
      }
    }
  });

  const uniqueArrayDivergencia = divergenciaArray.filter(
    (value, index, self) => {
      return self.indexOf(value) === index;
    },
  );
  let totalSKUAcertos = [];

  data.forEach((value) => {
    if (value.firstCount !== null) {
      totalSKUAcertos.push(value.item);
    }
  });

  const uniqueArrayAcertos = totalSKUAcertos.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  let totalDivergencia = uniqueArrayDivergencia.length;
  let totalAcertos = uniqueArrayAcertos.length - totalDivergencia;

  return { totalAcertos, totalDivergencia };
}
