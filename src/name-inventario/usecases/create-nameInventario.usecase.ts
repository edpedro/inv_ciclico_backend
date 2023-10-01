import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { CreateNameInventarioDto } from '../dto/create-name-inventario.dto';
import { NameInventarioRepository } from './../repositories/nameInventario.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateNameInventarioUseCase {
  constructor(
    private readonly nameInventarioRepository: NameInventarioRepository,
  ) {}

  async execute(data: CreateNameInventarioDto, req: ReqUserDto) {
    return this.nameInventarioRepository.createUser(data, req);
  }
}
