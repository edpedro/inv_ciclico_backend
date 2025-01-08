import { Injectable } from '@nestjs/common';
import { BaseExpedicaoRepository } from '../repositories/base-expedicao.repository';

@Injectable()
export class FindNameIdBaseExpedicaoUseCase {
  constructor(
    private readonly baseExpedicaoRepository: BaseExpedicaoRepository,
  ) {}

  async execute(id: string, userId: string) {
    return this.baseExpedicaoRepository.findNameId(id, userId);
  }
}
