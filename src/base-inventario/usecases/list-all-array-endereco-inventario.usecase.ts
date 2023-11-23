import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { AlocateEnderecoUserDto } from '../dto/alocate-endereco-inventario.dto';

@Injectable()
export class ListAllArrayEndereco {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(data: AlocateEnderecoUserDto, id: string) {
    return this.baseInventarioRepository.FindAllArrayEndereco(data, id);
  }
}
