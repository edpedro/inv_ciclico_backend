import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { CreateItemInventarioDto } from '../dto/create-item-inventario.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Injectable()
export class StoreNewItemInventario {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(data: CreateItemInventarioDto, id: string, req: ReqUserDto) {
    return this.baseInventarioRepository.storeItemInventario(data, id, req);
  }
}
