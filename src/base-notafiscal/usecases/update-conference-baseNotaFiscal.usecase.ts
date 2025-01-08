import { UpdateBaseNotafiscalDto } from '../dto/update-base-notafiscal.dto';
import { BaseNotaFiscalRepository } from '../repositories/base-notafiscal.repository';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateConferenceBaseNotaFiscalUseCase {
  constructor(
    private readonly baseNotaFiscalRepository: BaseNotaFiscalRepository,
  ) {}

  async execute(data: UpdateBaseNotafiscalDto, id: number) {
    return this.baseNotaFiscalRepository.updateConference(data, id);
  }
}
