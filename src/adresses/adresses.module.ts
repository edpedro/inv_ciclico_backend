import { Module } from '@nestjs/common';
import { AdressesService } from './service/adresses.service';
import { AdressesController } from './controller/adresses.controller';
import { AdressesRepository } from './repositories/adresses.repository';
import { CreateAdressUserCase } from './usecases/create-adresses.usercase';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListOneAdressUserCase } from './usecases/list-one-adresses.usercase';
import { ListAllAdressUserCase } from './usecases/list-all-adresses.usercase';
import { DeleteAllAdressUserCase } from './usecases/delete-all-adresses.usercase';
import { ListIdAdressUserCase } from './usecases/list-id-adresses.usercase';

@Module({
  controllers: [AdressesController],
  providers: [
    AdressesService,
    PrismaService,
    AdressesRepository,
    CreateAdressUserCase,
    ListOneAdressUserCase,
    ListAllAdressUserCase,
    DeleteAllAdressUserCase,
    ListIdAdressUserCase,
  ],
})
export class AdressesModule {}
