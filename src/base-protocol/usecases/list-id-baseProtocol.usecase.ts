import { BaseProtocolRepository } from '../repositories/base-protocol.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListIdProtocolUseCase {
  constructor(
    private readonly baseProtocolRepository: BaseProtocolRepository,
  ) {}

  async execute(id: string) {
    return this.baseProtocolRepository.findIdProtocol(id);
  }
}
