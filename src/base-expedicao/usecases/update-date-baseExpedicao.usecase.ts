import { Injectable } from '@nestjs/common';
import { BaseExpedicaoRepository } from '../repositories/base-expedicao.repository';

@Injectable()
export class UpdateDateCurrentBaseExpedicaoUseCase {
  constructor(
    private readonly baseExpedicaoRepository: BaseExpedicaoRepository,
  ) {}

  async execute(dateCurrent: string, id: string) {
    return this.baseExpedicaoRepository.updateDate(dateCurrent, id);
  }
}
