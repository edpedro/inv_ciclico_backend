import { Injectable } from '@nestjs/common';
import { BaseExpedicaoRepository } from '../repositories/base-expedicao.repository';
import { UpdateBaseExpedicaoDto } from '../dto/update-base-expedicao.dto';

@Injectable()
export class UpdateBaseExpedicaoUseCase {
  constructor(
    private readonly baseExpedicaoRepository: BaseExpedicaoRepository,
  ) {}

  async execute(data: UpdateBaseExpedicaoDto, id: string) {
    return this.baseExpedicaoRepository.update(data, id);
  }
}
