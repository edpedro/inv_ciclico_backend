import { Injectable } from '@nestjs/common';
import { NameProtocolRepository } from '../repositories/name-protocol.repository';

@Injectable()
export class ListIdNameProtocolUseCase {
  constructor(
    private readonly nameProtocolRepository: NameProtocolRepository,
  ) {}

  async execute(id: string) {
    return this.nameProtocolRepository.findIdProtocolName(id);
  }
}
