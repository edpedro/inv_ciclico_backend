import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { CreateBaseExpedicaoDto } from '../dto/create-base-expedicao.dto';
import { BaseExpedicaoRepository } from './../repositories/base-expedicao.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateBaseExpedicaoUseCase {
  constructor(
    private readonly baseExpedicaoRepository: BaseExpedicaoRepository,
  ) {}

  async execute(data: CreateBaseExpedicaoDto, req: ReqUserDto) {
    return this.baseExpedicaoRepository.createExpedicaoDB(data, req);
  }
}
