import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { ListBaseInventarioDto } from '../dto/list-base-inventario.dto';

@Injectable()
export class ListUniqueBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(id: number, idName: string): Promise<ListBaseInventarioDto> {
    return this.baseInventarioRepository.findUniqueInventario(id, idName);
  }
}
