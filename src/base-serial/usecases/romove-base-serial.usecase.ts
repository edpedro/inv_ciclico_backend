import { ListSerialDto } from '../dto/list-serial-serial.dto';
import { BaseSerialRepository } from '../repositories/base-serial.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveBaseSerialUseCase {
  constructor(private readonly baseSerialRepository: BaseSerialRepository) {}

  async execute(userId: string) {
    return this.baseSerialRepository.removeBaseSerial(userId);
  }
}
