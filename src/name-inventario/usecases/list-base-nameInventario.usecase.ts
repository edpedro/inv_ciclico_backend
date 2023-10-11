import { NameInventarioRepository } from './../repositories/name-inventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListOneNameBaseInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(id: string, create_id: string) {
    return this.nameInventarioRepository.findNameBaseInventario(id, create_id);
  }
}
