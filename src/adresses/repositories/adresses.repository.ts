import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdressDto } from '../dto/create-adress.dto';
import { ListAdressDto } from '../dto/list-adress.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdressesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAdresses(data: CreateAdressDto[]): Promise<any> {
    const idUnico = uuidv4();

    const registrosComIdUnico = data.map((valeu) => ({
      create_id: idUnico,
      ...valeu,
    }));

    return await this.prisma.adresses.createMany({ data: registrosComIdUnico });
  }

  async findNameAdress(nameNew: string): Promise<ListAdressDto[]> {
    return await this.prisma.adresses.findMany({
      where: {
        name: nameNew,
      },
    });
  }

  async findAllAdress(id: string): Promise<ListAdressDto[]> {
    return await this.prisma.adresses.findMany({
      where: {
        user_id: id,
      },
    });
  }

  async findIdAdress(id: string) {
    return await this.prisma.adresses.findMany({
      where: {
        create_id: id,
      },
    });
  }

  async deleteNameAdress(id: string) {
    return await this.prisma.adresses.deleteMany({
      where: {
        create_id: id,
      },
    });
  }
}
