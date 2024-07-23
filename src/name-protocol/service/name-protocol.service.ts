import { ListUsersInvitedUseCase } from 'src/users/usecases/list-users-invited.usecase';
import { ListUserOneUseCase } from 'src/users/usecases/list-user-one.usecase';
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
    private readonly listUserOneUseCase: ListUserOneUseCase,
    private readonly listUsersInvitedUseCase: ListUsersInvitedUseCase,
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
    const user = await this.listUserOneUseCase.execute(req.user.id);

    if (!user.createdById) {
      const invitedUsers = await this.listUsersInvitedUseCase.execute(
        req.user.id,
      );

      const invitedUserProtocols = await Promise.all(
        invitedUsers.map((invitedUser) =>
          this.listAllNameProtocolUseCase.execute(invitedUser.id),
        ),
      );

      const currentUserProtocols =
        await this.listAllNameProtocolUseCase.execute(req.user.id);

      const allProtocols = [currentUserProtocols, ...invitedUserProtocols];

      return allProtocols.flat();
    } else {
      const currentUserProtocols =
        await this.listAllNameProtocolUseCase.execute(req.user.id);

      return currentUserProtocols;
    }
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
