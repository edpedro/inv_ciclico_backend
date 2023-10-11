import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Injectable()
export class ListUserOnNameInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(req: ReqUserDto): Promise<any> {
    return this.baseInventarioRepository.findUserOnInventario(req);
  }
}
