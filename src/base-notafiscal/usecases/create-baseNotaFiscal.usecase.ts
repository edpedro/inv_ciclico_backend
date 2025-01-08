import { CreateBaseNotafiscalDto } from '../dto/create-base-notafiscal.dto';
import { BaseNotaFiscalRepository } from './../repositories/base-notafiscal.repository';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateBaseNotaFiscalUseCase {
  constructor(
    private readonly baseNotaFiscalRepository: BaseNotaFiscalRepository,
  ) {}

  async execute(data: CreateBaseNotafiscalDto[]) {
    return this.baseNotaFiscalRepository.uploadNotaFiscal(data);
  }
}
