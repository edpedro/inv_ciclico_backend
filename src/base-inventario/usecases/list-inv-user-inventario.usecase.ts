import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';

@Injectable()
export class ListUserOnInventarioUserUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(id: string, user_id: string) {
    return this.baseInventarioRepository.ListInventarioOnUser(user_id, id);
  }
}
