import { BaseSerialRepository } from '../repositories/base-serial.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListSerialBaseSerialUseCase {
  constructor(private readonly baseSerialRepository: BaseSerialRepository) {}

  async execute(serial: string) {
    return this.baseSerialRepository.findSerialBaseSerial(serial);
  }
}
