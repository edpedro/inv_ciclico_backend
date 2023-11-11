import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { AlocateEnderecoUser } from '../dto/alocate-endereco-inventario.dto';

@Injectable()
export class ListAllArrayEndereco {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(data: AlocateEnderecoUser, id: string) {
    return this.baseInventarioRepository.FindAllArrayEndereco(data, id);
  }
}
