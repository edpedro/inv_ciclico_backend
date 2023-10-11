import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { UpdateBaseInventarioDto } from '../dto/update-base-inventario.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Injectable()
export class UpdateBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(data: UpdateBaseInventarioDto, id: number, req: ReqUserDto) {
    return this.baseInventarioRepository.update(data, id, req);
  }
}
