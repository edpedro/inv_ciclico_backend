import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { ListBaseInventarioDto } from '../dto/list-base-inventario.dto';

@Injectable()
export class ListOnItemInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(id: number): Promise<ListBaseInventarioDto> {
    return this.baseInventarioRepository.findOnItemInventario(id);
  }
}
