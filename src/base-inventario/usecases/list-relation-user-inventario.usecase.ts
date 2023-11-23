import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';

@Injectable()
export class ListRelationUserInvInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(id: string) {
    return this.baseInventarioRepository.findRelationUserInventario(id);
  }
}
