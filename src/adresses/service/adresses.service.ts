import { ListOneAdressUserCase } from './../usecases/list-one-adresses.usercase';
import { CreateAdressUserCase } from './../usecases/create-adresses.usercase';
import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { UploadAdressDto } from '../dto/file-upload.adress.dto';
import { createExcelAdresses } from 'src/utils/Adresses/createExcelAdresses';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { ListAllAdressUserCase } from '../usecases/list-all-adresses.usercase';
import { DeleteAllAdressUserCase } from '../usecases/delete-all-adresses.usercase';
import { ListIdAdressUserCase } from '../usecases/list-id-adresses.usercase';

@Injectable()
export class AdressesService {
  constructor(
    private readonly createAdressUserCase: CreateAdressUserCase,
    private readonly listOneAdressUserCase: ListOneAdressUserCase,
    private readonly listAllAdressUserCase: ListAllAdressUserCase,
    private readonly deleteAllAdressUserCase: DeleteAllAdressUserCase,
    private readonly listIdAdressUserCase: ListIdAdressUserCase,
  ) {}

  async uploadAdress(
    file: UploadAdressDto,
    dataAdress: UploadAdressDto,
    req: ReqUserDto,
  ) {
    const adressExists = await this.listOneAdressUserCase.execute(
      dataAdress.name,
    );

    if (adressExists.length > 0) {
      throw new HttpException('Nome já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const data = await createExcelAdresses(file, dataAdress.name, req.user.id);

    const createAdress = await this.createAdressUserCase.execute(data);

    return createAdress;
  }

  async findAllAdress(req: ReqUserDto) {
    const adresses = await this.listAllAdressUserCase.execute(req.user.id);

    return adresses;
  }

  async deleteAllAdress(id: string) {
    const adressExists = await this.listIdAdressUserCase.execute(id);

    if (adressExists.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.deleteAllAdressUserCase.execute(id);

      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não deletados', HttpStatus.BAD_REQUEST);
    }
  }
}
