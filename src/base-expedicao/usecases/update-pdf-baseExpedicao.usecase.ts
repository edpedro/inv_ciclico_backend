import { Injectable } from '@nestjs/common';
import { BaseExpedicaoRepository } from '../repositories/base-expedicao.repository';

@Injectable()
export class UpdatePDFBaseExpedicaoUseCase {
  constructor(
    private readonly baseExpedicaoRepository: BaseExpedicaoRepository,
  ) {}

  async execute(pdf: boolean, id: string) {
    return this.baseExpedicaoRepository.updatePDF(pdf, id);
  }
}
