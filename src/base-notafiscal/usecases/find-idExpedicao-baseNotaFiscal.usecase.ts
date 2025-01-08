import { BaseNotaFiscalRepository } from '../repositories/base-notafiscal.repository';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FindIdExpedicaoBaseNotaFiscalUseCase {
  constructor(
    private readonly baseNotaFiscalRepository: BaseNotaFiscalRepository,
  ) {}

  async execute(id: string) {
    return this.baseNotaFiscalRepository.findIdExpedicao(id);
  }
}
