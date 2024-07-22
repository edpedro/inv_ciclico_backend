import { BaseProtocolRepository } from '../repositories/base-protocol.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteSerialProtocolUseCase {
  constructor(
    private readonly baseProtocolRepository: BaseProtocolRepository,
  ) {}

  async execute(id: number) {
    return this.baseProtocolRepository.deleteSerialProtocol(id);
  }
}
