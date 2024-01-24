import { AdressesRepository } from './../repositories/adresses.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListIdAdressUserCase {
  constructor(private readonly adressesRepository: AdressesRepository) {}

  async execute(id: string) {
    return this.adressesRepository.findIdAdress(id);
  }
}
