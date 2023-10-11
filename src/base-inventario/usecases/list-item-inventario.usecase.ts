import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { ListBaseInventarioDto } from '../dto/list-base-inventario.dto';
import { ListItemDto } from '../dto/list-item.dto';

@Injectable()
export class ListItemBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(
    data: ListItemDto,
    id: string,
  ): Promise<ListBaseInventarioDto[]> {
    return this.baseInventarioRepository.findAllItem(data, id);
  }
}
