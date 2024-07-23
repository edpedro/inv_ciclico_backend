import { Injectable } from '@nestjs/common';
import { NameProtocolRepository } from '../repositories/name-protocol.repository';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Injectable()
export class ListAllNameProtocolUseCase {
  constructor(
    private readonly nameProtocolRepository: NameProtocolRepository,
  ) {}

  async execute(id: string) {
    return this.nameProtocolRepository.findAllProtocolName(id);
  }
}
