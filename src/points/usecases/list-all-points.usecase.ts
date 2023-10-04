import { ListBaseInventarioDto } from './../../base-inventario/dto/list-base-inventario.dto';
import { Injectable } from '@nestjs/common';
import { PointsRepository } from '../repositories/points.repository';

@Injectable()
export class ListAllBasePointsUseCase {
  constructor(private readonly PointsRepository: PointsRepository) {}

  async execute(): Promise<ListBaseInventarioDto[]> {
    return this.PointsRepository.findPointsBase();
  }
}
