import { CreateBaseSerialDto } from '../dto/create-base-serial.dto';
import { BaseSerialRepository } from './../repositories/base-serial.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateBaseSerialUseCase {
  constructor(private readonly baseSerialRepository: BaseSerialRepository) {}

  async execute(data: CreateBaseSerialDto[]) {
    return this.baseSerialRepository.createBaseSerial(data);
  }
}
