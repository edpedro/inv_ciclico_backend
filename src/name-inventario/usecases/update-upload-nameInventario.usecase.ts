import { NameInventarioRepository } from './../repositories/name-inventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUploadNameInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(id: string) {
    return this.nameInventarioRepository.updateUploadStatus(id, true);
  }
}
