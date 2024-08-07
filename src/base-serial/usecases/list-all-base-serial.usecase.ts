import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { BaseSerialRepository } from '../repositories/base-serial.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllCountBaseSerialUseCase {
  constructor(private readonly baseSerialRepository: BaseSerialRepository) {}

  async execute(userId: string) {
    return this.baseSerialRepository.findAllCount(userId);
  }
}
