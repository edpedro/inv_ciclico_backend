import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { AdressesRepository } from './../repositories/adresses.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAllAdressUserCase {
  constructor(private readonly adressesRepository: AdressesRepository) {}

  async execute(id: string) {
    return this.adressesRepository.findAllAdress(id);
  }
}
