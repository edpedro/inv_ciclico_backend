import { Injectable } from '@nestjs/common';
import { NameProtocolRepository } from '../repositories/name-protocol.repository';

@Injectable()
export class ListNameProtocolUseCase {
  constructor(
    private readonly nameProtocolRepository: NameProtocolRepository,
  ) {}

  async execute(name: string) {
    return this.nameProtocolRepository.findOneProtocolName(name);
  }
}
