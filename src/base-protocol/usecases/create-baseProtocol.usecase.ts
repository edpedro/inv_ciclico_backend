import { BaseProtocolRepository } from './../repositories/base-protocol.repository';
import { Injectable } from '@nestjs/common';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { BaseProtocolsDto } from 'src/utils/baseProtocol/CreateProtocolDto';

@Injectable()
export class CreateBaseProtocolUseCase {
  constructor(
    private readonly baseProtocolRepository: BaseProtocolRepository,
  ) {}

  async execute(data: BaseProtocolsDto) {
    return this.baseProtocolRepository.createBaseProtocol(data);
  }
}
