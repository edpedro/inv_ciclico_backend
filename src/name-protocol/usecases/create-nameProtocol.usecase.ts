import { Injectable } from '@nestjs/common';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { NameProtocolRepository } from '../repositories/name-protocol.repository';
import { PrismaClient } from '@prisma/client';
import { CreateNameProtocolDto } from '../dto/create-name-protocol.dto';

@Injectable()
export class CreateNameProtocolUseCase {
  constructor(
    private readonly nameProtocolRepository: NameProtocolRepository,
  ) {}

  async execute(data: CreateNameProtocolDto, req: ReqUserDto) {
    return this.nameProtocolRepository.createNameProtocol(data, req);
  }
}
