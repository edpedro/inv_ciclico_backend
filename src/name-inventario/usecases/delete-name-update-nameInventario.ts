import { UpdateNameInventarioDto } from '../dto/update-name-inventario.dto';
import { NameInventarioRepository } from './../repositories/name-inventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadStatusInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(id: string) {
    return this.nameInventarioRepository.deleteInventarioUploadStatus(id);
  }
}
