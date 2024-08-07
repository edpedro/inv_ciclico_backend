import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { BaseSerialRepository } from '../repositories/base-serial.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllStatusJobsUserCase {
  constructor(private readonly baseSerialRepository: BaseSerialRepository) {}

  async execute(req: ReqUserDto) {
    return this.baseSerialRepository.findAllStatusUser(req);
  }
}
