import { NameInventarioRepository } from './../repositories/nameInventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListOneInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(id: string) {
    return this.nameInventarioRepository.findOneNameInventario(id);
  }
}
