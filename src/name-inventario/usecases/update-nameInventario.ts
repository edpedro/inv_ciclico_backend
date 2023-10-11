import { UpdateNameInventarioDto } from '../dto/update-name-inventario.dto';
import { NameInventarioRepository } from './../repositories/name-inventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateNameInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(id: string, data: UpdateNameInventarioDto) {
    return this.nameInventarioRepository.updateName(id, data);
  }
}
