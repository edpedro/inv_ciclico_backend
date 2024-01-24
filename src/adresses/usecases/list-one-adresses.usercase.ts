import { AdressesRepository } from './../repositories/adresses.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListOneAdressUserCase {
  constructor(private readonly adressesRepository: AdressesRepository) {}

  async execute(name: string) {
    return this.adressesRepository.findNameAdress(name);
  }
}
