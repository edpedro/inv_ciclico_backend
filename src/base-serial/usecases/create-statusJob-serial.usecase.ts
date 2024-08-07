import { CreateStatusJobDto } from '../dto/create-statusJob-serial.dto';
import { BaseSerialRepository } from '../repositories/base-serial.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateStatusJobUserUseCase {
  constructor(private readonly baseSerialRepository: BaseSerialRepository) {}

  async execute(data: CreateStatusJobDto) {
    return this.baseSerialRepository.createStatusJob(data);
  }
}
