import { NameInventarioRepository } from '../repositories/name-inventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteFkAdressNameInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(id: string) {
    return this.nameInventarioRepository.deleteAdressName(id);
  }
}
