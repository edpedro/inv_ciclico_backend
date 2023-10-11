import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { NameInventarioRepository } from './../repositories/name-inventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListOneNameInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(name: string, req: ReqUserDto) {
    return this.nameInventarioRepository.findOneUserName(name, req);
  }
}
