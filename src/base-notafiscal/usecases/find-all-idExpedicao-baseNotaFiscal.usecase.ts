import { BaseNotaFiscalRepository } from '../repositories/base-notafiscal.repository';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllIdExpedicaoBaseNotaFiscalUseCase {
  constructor(
    private readonly baseNotaFiscalRepository: BaseNotaFiscalRepository,
  ) {}

  async execute(id: string) {
    return this.baseNotaFiscalRepository.findAllExpedicaoNotaFiscal(id);
  }
}
