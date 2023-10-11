import { UpdateNameInventarioDto } from '../dto/update-name-inventario.dto';
import { NameInventarioRepository } from './../repositories/nameInventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateFirtsSecondNameInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(id: string, data: UpdateNameInventarioDto) {
    return this.nameInventarioRepository.updateFirsSecondStatus(id, data);
  }
}
