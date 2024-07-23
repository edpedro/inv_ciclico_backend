import { RemoveBaseSerialUseCase } from './../usecases/romove-base-serial.usecase';
import { ListSerialProtocolUseCase } from './../../base-protocol/usecases/list-serial-baseProtocol.usecase';
import { ListSerialBaseSerialUseCase } from './../usecases/list-serial-base-serial.usecase';
import { CreateBaseSerialUseCase } from './../usecases/create-base-serial.usecase';
import { ListUserOneUseCase } from './../../users/usecases/list-user-one.usecase';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { createExcelBaseSerial } from 'src/utils/baseSerial/createExcelBaseSerial';
import { UploadDto } from 'src/utils/file-upload.dto';
import { ListSerialDto } from '../dto/lsit-serial-serial.dto';

@Injectable()
export class BaseSerialService {
  constructor(
    private readonly listUserOneUseCase: ListUserOneUseCase,
    private readonly createBaseSerialUseCase: CreateBaseSerialUseCase,
    private readonly listSerialBaseSerialUseCase: ListSerialBaseSerialUseCase,
    private readonly listSerialProtocolUseCase: ListSerialProtocolUseCase,
    private readonly removeBaseSerialUseCase: RemoveBaseSerialUseCase,
  ) {}
  async create(file: UploadDto, req: ReqUserDto) {
    const userExist = await this.listUserOneUseCase.execute(req.user.id);

    if (!userExist) {
      throw new HttpException('Usuario não encontrado', HttpStatus.BAD_REQUEST);
    }

    try {
      const data = await createExcelBaseSerial(file, req.user.id);

      const createBaseSerial = await this.createBaseSerialUseCase.execute(data);

      return createBaseSerial;
    } catch (error) {
      console.log(error);
      throw new HttpException('Erro no upload', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(serial: string) {
    let serialBaseProtocol: ListSerialDto = null;
    //Buscar primeiro se consta no protocolo
    const resultProtocol = await this.listSerialProtocolUseCase.execute(serial);

    if (resultProtocol) {
      serialBaseProtocol = {
        serial: resultProtocol.serial,
        id: resultProtocol.id,
        codigo: resultProtocol.codigo,
        caixa: resultProtocol.caixa,
        nameProtocols: resultProtocol.nameProtocols.name,
      };
      return serialBaseProtocol;
    } else {
      let serialBaseSerial: ListSerialDto = null;
      //depois busca na base serial
      const result = await this.listSerialBaseSerialUseCase.execute(serial);

      let filterSerial =
        result.find((item) => item.center === 'V161') ||
        result.find((item) => item.center === 'X161') ||
        (result.length > 0 ? result[0] : null);

      if (filterSerial) {
        serialBaseSerial = {
          serial: filterSerial.serial,
          id: filterSerial.id,
          codigo: filterSerial.codigo,
          deposit: filterSerial.deposit,
          center: filterSerial.center,
        };
      }

      return serialBaseSerial;
    }
  }

  async remove(req: ReqUserDto) {
    const userExist = await this.listUserOneUseCase.execute(req.user.id);

    if (!userExist) {
      throw new HttpException('Usuario não encontrado', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.removeBaseSerialUseCase.execute(req.user.id);

      return `Usuario #${req.user.id} deletado da baseSerial`;
    } catch (error) {
      throw new HttpException('Dados não deletados', HttpStatus.BAD_REQUEST);
    }
  }
}
