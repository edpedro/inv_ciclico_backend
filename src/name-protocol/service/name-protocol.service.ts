import { UpdateNameProtocolUseCase } from './../usecases/update-nameProtocol.usecase';
import { DeleteNameProtocolUseCase } from './../usecases/delete-nameProtocol.usecase';
import { ListIdNameProtocolUseCase } from './../usecases/list-id-nameProtocol.usecase';
import { ListAllNameProtocolUseCase } from './../usecases/list-all-nameProtocol.usecase';
import { ListNameProtocolUseCase } from './../usecases/list-nameProtocol.usecase';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { CreateNameProtocolDto } from '../dto/create-name-protocol.dto';
import { CreateNameProtocolUseCase } from './../usecases/create-nameProtocol.usecase';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateNameProtocolDto } from '../dto/update-name-protocol.dto';

@Injectable()
export class NameProtocolService {
  constructor(
    private readonly createNameProtocolUseCase: CreateNameProtocolUseCase,
    private readonly listNameProtocolUseCase: ListNameProtocolUseCase,
    private readonly listAllNameProtocolUseCase: ListAllNameProtocolUseCase,
    private readonly listIdNameProtocolUseCase: ListIdNameProtocolUseCase,
    private readonly deleteNameProtocolUseCase: DeleteNameProtocolUseCase,
    private readonly updateNameProtocolUseCase: UpdateNameProtocolUseCase,
  ) {}

  async create(data: CreateNameProtocolDto, req: ReqUserDto) {
    try {
      const existName = await this.listNameProtocolUseCase.execute(data.name);

      if (existName) {
        throw new HttpException(
          'Nome do protocolo já cadastrado',
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.createNameProtocolUseCase.execute(data, req);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não cadastrado', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(req: ReqUserDto) {
    const result = await this.listAllNameProtocolUseCase.execute(req);
    return result;
  }

  async deleteName(id: string) {
    try {
      const existNameId = await this.listIdNameProtocolUseCase.execute(id);

      if (!existNameId) {
        throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
      }

      await this.deleteNameProtocolUseCase.execute(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não deletado', HttpStatus.BAD_REQUEST);
    }
  }
  async update(id: string, data: UpdateNameProtocolDto) {
    try {
      const existNameId = await this.listIdNameProtocolUseCase.execute(id);

      if (!existNameId) {
        throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
      }

      const result = await this.updateNameProtocolUseCase.execute(id, data);

      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }
}
