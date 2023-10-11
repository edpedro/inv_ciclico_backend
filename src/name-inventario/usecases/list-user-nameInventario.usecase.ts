import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { NameInventarioRepository } from './../repositories/nameInventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUserNameBaseInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(req: ReqUserDto) {
    return this.nameInventarioRepository.findOnUserNameInventario(req);
  }
}
