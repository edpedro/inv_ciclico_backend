import { Injectable } from '@nestjs/common';
import { NameProtocolRepository } from '../repositories/name-protocol.repository';

@Injectable()
export class ListIdAllNameProtocolUseCase {
  constructor(
    private readonly nameProtocolRepository: NameProtocolRepository,
  ) {}

  async execute(id: string[]) {
    return this.nameProtocolRepository.findIdAllProtocolName(id);
  }
}
