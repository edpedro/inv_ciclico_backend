import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';

@Injectable()
export class FindItemInventario {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(item: string) {
    return this.baseInventarioRepository.findItemInventario(item);
  }
}
