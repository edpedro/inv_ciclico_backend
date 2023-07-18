import { ListDashboardDto } from '../../dashboard/dto/list-dashboard.dto';
export async function SobraFaltaSoma(data: ListDashboardDto[]) {
  //Total de Falta e Sobra
  let totalFalta = 0;
  let totalSobra = 0;

  data.forEach((inv) => {
    if (inv.secondCount !== null) {
      const saldo = inv.secondCount - inv.saldoWms;

      if (saldo > 0) {
        totalSobra += saldo;
      } else if (saldo < 0) {
        totalFalta += Math.abs(saldo);
      }
    } else {
      if (inv.firstCount !== null) {
        const saldo = inv.firstCount - inv.saldoWms;

        if (saldo > 0) {
          totalSobra += saldo;
        } else if (saldo < 0) {
          totalFalta += Math.abs(saldo);
        }
      }
    }
  });

  //soma total de divergencias
  const totalSomaDivergencias = totalFalta + totalSobra;

  return { totalSomaDivergencias, totalFalta, totalSobra };
}
