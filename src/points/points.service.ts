import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PointsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}
  async findPointsOne(req: any) {
    const baseInvExists = await this.prisma.baseInventario.findMany({
      where: {
        username_id: req.user.id,
      },
    });

    // total de 2 segunda contagem
    let totalSegundaContagem: number = 0;

    baseInvExists.forEach((value) => {
      if (value.secondCount !== null) {
        totalSegundaContagem = totalSegundaContagem + 1;
      }
    });

    // Total SKU
    const totalSKU = baseInvExists.reduce((acc) => {
      return acc + 1;
    }, 0);

    //Total de Divergencia e Acertos
    const divergenciaArray = [];

    baseInvExists.forEach((value) => {
      if (value.secondCount) {
        if (
          value.secondCount > value.saldoWms ||
          value.secondCount < value.saldoWms
        ) {
          divergenciaArray.push(value.item);
        }
      }
    });

    const uniqueArrayDivergencia = divergenciaArray.filter(
      (value, index, self) => {
        return self.indexOf(value) === index;
      },
    );

    let totalDivergencia = uniqueArrayDivergencia.length;
    let totalAcertos = totalSKU - totalDivergencia;

    const totalPoints = totalAcertos - totalSegundaContagem;

    return {
      totalAcertos,
      totalSegundaContagem,
      totalPoints,
    };
  }

  async findPointsAllUsers(req: any) {
    const id = req.user.id as string;

    const baseInvExists = await this.prisma.baseInventario.findMany();

    const user = await this.usersService.findAllInvited(id);

    const novoArray = user.map((userData) => {
      const totalSKU = baseInvExists.reduce((acc, baseData) => {
        if (baseData.username_id === userData.id) {
          return acc + 1;
        }
        return acc;
      }, 0);

      // total de 2 segunda contagem
      let totalSegundaContagem: number = 0;

      baseInvExists.forEach((value) => {
        if (value.username_id === userData.id) {
          if (value.secondCount !== null) {
            totalSegundaContagem = totalSegundaContagem + 1;
          }
        }
      });

      //Total de Divergencia e Acertos
      const divergenciaArray = [];

      baseInvExists.forEach((value) => {
        if (value.username_id === userData.id) {
          if (value.secondCount) {
            if (
              value.secondCount > value.saldoWms ||
              value.secondCount < value.saldoWms
            ) {
              divergenciaArray.push(value.item);
            }
          }
        }
      });

      const uniqueArrayDivergencia = divergenciaArray.filter(
        (value, index, self) => {
          return self.indexOf(value) === index;
        },
      );

      let totalDivergencia = uniqueArrayDivergencia.length;
      let totalAcertos = totalSKU - totalDivergencia;

      const totalPoints = totalAcertos - totalSegundaContagem;

      return {
        userData,
        totalPoints,
      };
    });

    return novoArray;
  }
}
