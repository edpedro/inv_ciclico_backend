import { BaseProtocolRepository } from '../repositories/base-protocol.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListSerialProtocolUseCase {
  constructor(
    private readonly baseProtocolRepository: BaseProtocolRepository,
  ) {}

  async execute(serial: string) {
    return this.baseProtocolRepository.findOneSerialProtocol(serial);
  }
}
