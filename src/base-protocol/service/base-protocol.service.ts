import { DeleteSerialProtocolUseCase } from './../usecases/delete-serial-baseProtocol.usecase';
import { ListSerialProtocolUseCase } from './../usecases/list-serial-baseProtocol.usecase';
import { ListAllProtocolUseCase } from './../usecases/list-all-baseProtocol.usecase';
import { ListIdNameProtocolUseCase } from './../../name-protocol/usecases/list-id-nameProtocol.usecase';
import { ListIdAllNameProtocolUseCase } from './../../name-protocol/usecases/list-idAll-nameProtocol.usecase';
import { CreateBaseProtocolUseCase } from './../usecases/create-baseProtocol.usecase';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateBaseProtocolDto } from '../dto/update-base-protocol.dto';
import { BaseProtocolsDto } from 'src/utils/baseProtocol/CreateProtocolDto';

@Injectable()
export class BaseProtocolService {
  constructor(
    private readonly createBaseProtocolUseCase: CreateBaseProtocolUseCase,
    private readonly listIdAllNameProtocolUseCase: ListIdAllNameProtocolUseCase,
    private readonly listAllProtocolUseCase: ListAllProtocolUseCase,
    private readonly listSerialProtocolUseCase: ListSerialProtocolUseCase,
    private readonly deleteSerialProtocolUseCase: DeleteSerialProtocolUseCase,
  ) {}

  async create(data: BaseProtocolsDto) {
    const nameProtolsIds = data.protocols.map(
      (protocol) => protocol.nameProtocols_id,
    );
    const uniqueNameProtocolsIds = Array.from(new Set(nameProtolsIds));

    const existIds = await this.listIdAllNameProtocolUseCase.execute(
      uniqueNameProtocolsIds,
    );

    const existingNameProtocolsSet = new Set(
      existIds.map((protocol) => protocol.id),
    );

    const missingNameProtocolsIds = uniqueNameProtocolsIds.filter(
      (id) => !existingNameProtocolsSet.has(id),
    );

    if (missingNameProtocolsIds.length > 0) {
      throw new HttpException(
        `Protocolo ${missingNameProtocolsIds} não encontrados`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const result = await this.createBaseProtocolUseCase.execute(data);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não cadastrado', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(id: string) {
    const result = await this.listAllProtocolUseCase.execute(id);
    return result;
  }

  async remove(serial: string) {
    const cleanedSerialProt = serial.trim();

    const protocol = await this.listSerialProtocolUseCase.execute(
      cleanedSerialProt,
    );

    if (!protocol) {
      throw new HttpException(
        `Serial ${serial} não encontrado`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.deleteSerialProtocolUseCase.execute(protocol.id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não deletados', HttpStatus.BAD_REQUEST);
    }
  }
}
