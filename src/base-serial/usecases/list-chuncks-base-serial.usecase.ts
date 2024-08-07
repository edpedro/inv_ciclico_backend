import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { BaseSerialRepository } from '../repositories/base-serial.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllChunksBaseSerialUseCase {
  constructor(private readonly baseSerialRepository: BaseSerialRepository) {}

  async execute(userId: string, chunkSize: number) {
    return this.baseSerialRepository.findChunks(userId, chunkSize);
  }
}
