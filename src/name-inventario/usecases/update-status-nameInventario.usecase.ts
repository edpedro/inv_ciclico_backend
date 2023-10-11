import { NameInventarioRepository } from './../repositories/nameInventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateStatusNameInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(id: string) {
    return this.nameInventarioRepository.updateStatus(id);
  }
}
