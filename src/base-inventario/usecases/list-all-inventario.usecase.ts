import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { ListBaseInventarioDto } from '../dto/list-base-inventario.dto';

@Injectable()
export class ListAllBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(id: string): Promise<ListBaseInventarioDto[]> {
    return this.baseInventarioRepository.findAllBaseInventario(id);
  }
}
