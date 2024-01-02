import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';

@Injectable()
export class RemoveIdAlocateUserInventario {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(id: string) {
    return this.baseInventarioRepository.removeIdAlocateUserInventario(id);
  }
}
