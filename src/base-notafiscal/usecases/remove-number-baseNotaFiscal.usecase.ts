import { BaseNotaFiscalRepository } from '../repositories/base-notafiscal.repository';

import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveNumberBaseNotaFiscalUseCase {
  constructor(
    private readonly baseNotaFiscalRepository: BaseNotaFiscalRepository,
  ) {}

  async execute(number: string, idUser: string) {
    return this.baseNotaFiscalRepository.removerNumberNotaFiscal(
      number,
      idUser,
    );
  }
}
