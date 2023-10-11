import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { ListEnderecoDto } from '../dto/list-endereco.dto';
import { ListBaseInventarioDto } from '../dto/list-base-inventario.dto';

@Injectable()
export class ListEnderecoBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(
    data: ListEnderecoDto,
    id: string,
  ): Promise<ListBaseInventarioDto[]> {
    return this.baseInventarioRepository.findAllEndereco(id, data);
  }
}
