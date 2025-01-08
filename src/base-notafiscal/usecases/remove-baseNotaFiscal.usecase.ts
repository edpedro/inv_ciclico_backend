import { BaseNotaFiscalRepository } from '../repositories/base-notafiscal.repository';

import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveBaseNotaFiscalUseCase {
  constructor(
    private readonly baseNotaFiscalRepository: BaseNotaFiscalRepository,
  ) {}

  async execute(idExpedicao: string, idUser: string) {
    return this.baseNotaFiscalRepository.removeNotaFiscal(idExpedicao, idUser);
  }
}
