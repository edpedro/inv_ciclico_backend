import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { UpdateWmsInventarioDto } from '../dto/update-wms-inventario.dto';

@Injectable()
export class UpdateWmsBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(id: number, data: UpdateWmsInventarioDto) {
    return this.baseInventarioRepository.updateWms(id, data);
  }
}
