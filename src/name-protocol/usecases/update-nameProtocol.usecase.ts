import { Injectable } from '@nestjs/common';
import { NameProtocolRepository } from '../repositories/name-protocol.repository';
import { UpdateNameProtocolDto } from '../dto/update-name-protocol.dto';

@Injectable()
export class UpdateNameProtocolUseCase {
  constructor(
    private readonly nameProtocolRepository: NameProtocolRepository,
  ) {}

  async execute(id: string, data: UpdateNameProtocolDto) {
    return this.nameProtocolRepository.updateProtocolName(id, data);
  }
}
