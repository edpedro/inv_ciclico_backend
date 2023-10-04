import { UsersService } from 'src/users/service/users.service';
import { ListAllBasePointsUseCase } from './../usecases/list-all-points.usecase';
import { ListOnePointsUseCase } from './../usecases/list-one-points.usecase';
import { Injectable } from '@nestjs/common';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { DivergeciasAcertos } from 'src/utils/dashboard/divergeciasAcertos';
import { TotalContagem } from 'src/utils/dashboard/totalContagem';
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

    const { totalSegundaContagem } = await TotalContagem(baseInvExists);

    const { totalAcertos } = await DivergeciasAcertos(baseInvExists);

    const totalPoints = totalAcertos - totalSegundaContagem;

    return {
      totalAcertos,
      totalSegundaContagem,
      totalPoints,
    };
  }

  async findPointsAllUsers(req: ReqUserDto) {
    const baseInvExists = await this.listAllBasePointsUseCase.execute();

    const user = await this.usersService.findAllUsersInvited(req.user.id);

    return await createPoints(user, baseInvExists);
  }
}
