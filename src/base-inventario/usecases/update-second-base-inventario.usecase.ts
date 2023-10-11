import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { UpdateBaseInventarioDto } from '../dto/update-base-inventario.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Injectable()
export class UpdateSecondBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(id: number, req: ReqUserDto, data: UpdateBaseInventarioDto) {
    return this.baseInventarioRepository.updateSecond(id, req, data);
  }
}
