import { Injectable } from '@nestjs/common';
import { BaseExpedicaoRepository } from '../repositories/base-expedicao.repository';

@Injectable()
export class FindExpedicaoBaseExpedicaoUseCase {
  constructor(
    private readonly baseExpedicaoRepository: BaseExpedicaoRepository,
  ) {}

  async execute(id: string[]) {
    return this.baseExpedicaoRepository.findListExpedicao(id);
  }
}
