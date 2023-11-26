import { UsersService } from 'src/users/service/users.service';
import { ListAllBasePointsUseCase } from './../usecases/list-all-points.usecase';
import { ListOnePointsUseCase } from './../usecases/list-one-points.usecase';
import { Injectable } from '@nestjs/common';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { createPoints } from 'src/utils/points/createPoints';

@Injectable()
export class PointsService {
  constructor(
    private readonly listOnePointsUseCase: ListOnePointsUseCase,
    private readonly listAllBasePointsUseCase: ListAllBasePointsUseCase,
    private readonly usersService: UsersService,
  ) {}

  async findPointsOne(req: ReqUserDto) {
    const baseInvExists = await this.listOnePointsUseCase.execute(req);

    const totals = baseInvExists.reduce(
      (acc, baseData) => {
        if (baseData.secondCount !== null) {
          acc.totalSegundaContagem++;
        } else {
          acc.totalPrimeiraContagem++;
        }

        return acc;
      },
      { totalSKU: 0, totalPrimeiraContagem: 0, totalSegundaContagem: 0 },
    );

    const { totalPrimeiraContagem, totalSegundaContagem } = totals;

    const somaTotal = totalPrimeiraContagem + totalSegundaContagem;
    const pocentagem = 100 - (totalSegundaContagem * 100) / somaTotal;
    const totalPoints = Number(((somaTotal * pocentagem) / 100).toFixed(2));

    return {
      somaTotal,
      totalPrimeiraContagem,
      totalSegundaContagem,
      totalPoints,
    };
  }

  async findPointsAllUsers(req: ReqUserDto) {
    const baseInvExists = await this.listAllBasePointsUseCase.execute();

    const user = await this.usersService.findAllUsersInvited(req.user.id);

    const result = await createPoints(user, baseInvExists);

    return result;
  }
}
