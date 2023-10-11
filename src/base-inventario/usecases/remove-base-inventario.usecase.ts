import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';

@Injectable()
export class RemoveBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(id: string): Promise<any> {
    return this.baseInventarioRepository.remove(id);
  }
}
