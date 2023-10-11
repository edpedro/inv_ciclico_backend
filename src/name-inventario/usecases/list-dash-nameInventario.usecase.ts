import { NameInventarioRepository } from './../repositories/name-inventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListDashNameInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute() {
    return this.nameInventarioRepository.findAllDash();
  }
}
