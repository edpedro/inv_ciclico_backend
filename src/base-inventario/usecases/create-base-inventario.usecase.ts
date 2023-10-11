import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { CreateBaseInventarioDto } from '../dto/create-base-inventario.dto';

@Injectable()
export class CreateBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(data: CreateBaseInventarioDto[]) {
    return this.baseInventarioRepository.createBaseInventario(data);
  }
}
