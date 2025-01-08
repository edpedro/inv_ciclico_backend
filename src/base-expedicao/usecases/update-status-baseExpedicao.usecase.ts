import { Injectable } from '@nestjs/common';
import { BaseExpedicaoRepository } from '../repositories/base-expedicao.repository';

@Injectable()
export class UpdateStatusBaseExpedicaoUseCase {
  constructor(
    private readonly baseExpedicaoRepository: BaseExpedicaoRepository,
  ) {}

  async execute(status: string, id: string) {
    return this.baseExpedicaoRepository.updateStatus(status, id);
  }
}
