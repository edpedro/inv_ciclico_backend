import { ListBaseInventarioDto } from './../../base-inventario/dto/list-base-inventario.dto';
import { Injectable } from '@nestjs/common';
import { PointsRepository } from '../repositories/points.repository';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Injectable()
export class ListOnePointsUseCase {
  constructor(private readonly PointsRepository: PointsRepository) {}

  async execute(req: ReqUserDto): Promise<ListBaseInventarioDto[]> {
    return this.PointsRepository.findPointsOne(req);
  }
}
