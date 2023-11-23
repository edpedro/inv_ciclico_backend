import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { ListUsersEndInventarioDto } from '../dto/list-users-enderecos-inventario.dto';

@Injectable()
export class ListAllUsersEnderecoBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(id: string): Promise<ListUsersEndInventarioDto[]> {
    return this.baseInventarioRepository.findAllUsersInventario(id);
  }
}
