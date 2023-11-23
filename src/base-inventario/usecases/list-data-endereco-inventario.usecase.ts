import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { ListBaseInventarioDto } from '../dto/list-base-inventario.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Injectable()
export class ListDataEnderecoBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(id: string, req: ReqUserDto): Promise<ListBaseInventarioDto[]> {
    return this.baseInventarioRepository.findEndecoBaseInventario(id, req);
  }
}
