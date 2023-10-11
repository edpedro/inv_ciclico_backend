import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { NameInventarioRepository } from './../repositories/name-inventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListIdNameUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(id: string, req: ReqUserDto) {
    return this.nameInventarioRepository.findIdName(id, req);
  }
}
