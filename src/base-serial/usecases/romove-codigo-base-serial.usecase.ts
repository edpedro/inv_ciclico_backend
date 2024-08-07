import { BaseSerialRepository } from '../repositories/base-serial.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveCodigoBaseSerialUseCase {
  constructor(private readonly baseSerialRepository: BaseSerialRepository) {}

  async execute(codigo: string) {
    return this.baseSerialRepository.removeCodigoBaseSerial(codigo);
  }
}
