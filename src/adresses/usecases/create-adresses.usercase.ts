import { CreateAdressDto } from '../dto/create-adress.dto';
import { AdressesRepository } from './../repositories/adresses.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAdressUserCase {
  constructor(private readonly adressesRepository: AdressesRepository) {}

  async execute(data: CreateAdressDto[]) {
    return this.adressesRepository.createAdresses(data);
  }
}
