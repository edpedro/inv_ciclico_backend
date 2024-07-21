import { Injectable } from '@nestjs/common';
import { NameProtocolRepository } from '../repositories/name-protocol.repository';

@Injectable()
export class DeleteNameProtocolUseCase {
  constructor(
    private readonly nameProtocolRepository: NameProtocolRepository,
  ) {}

  async execute(id: string) {
    return this.nameProtocolRepository.deleteProtocolName(id);
  }
}
