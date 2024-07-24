import { ListAllNameProtocolUseCase } from './../../name-protocol/usecases/list-all-nameProtocol.usecase';
import { ListUsersInvitedUseCase } from './../../users/usecases/list-users-invited.usecase';
import { ListUserOneUseCase } from './../../users/usecases/list-user-one.usecase';
import { DeleteSerialProtocolUseCase } from './../usecases/delete-serial-baseProtocol.usecase';
import { ListSerialProtocolUseCase } from './../usecases/list-serial-baseProtocol.usecase';
import { ListAllProtocolUseCase } from './../usecases/list-all-baseProtocol.usecase';
import { ListIdAllNameProtocolUseCase } from './../../name-protocol/usecases/list-idAll-nameProtocol.usecase';
import { CreateBaseProtocolUseCase } from './../usecases/create-baseProtocol.usecase';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseProtocolsDto } from 'src/utils/baseProtocol/CreateProtocolDto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { ListNameProtocolDto } from 'src/name-protocol/dto/list-name-protocol.dto';

@Injectable()
export class BaseProtocolService {
  constructor(
    private readonly createBaseProtocolUseCase: CreateBaseProtocolUseCase,
    private readonly listIdAllNameProtocolUseCase: ListIdAllNameProtocolUseCase,
    private readonly listAllProtocolUseCase: ListAllProtocolUseCase,
    private readonly listSerialProtocolUseCase: ListSerialProtocolUseCase,
    private readonly deleteSerialProtocolUseCase: DeleteSerialProtocolUseCase,
    private readonly listUserOneUseCase: ListUserOneUseCase,
    private readonly listUsersInvitedUseCase: ListUsersInvitedUseCase,
    private readonly listAllNameProtocolUseCase: ListAllNameProtocolUseCase,
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

  async findIdProtocol(id: string) {
    const result = await this.listAllProtocolUseCase.execute(id);
    return result;
  }

  async findAll(req: ReqUserDto) {
    const user = await this.listUserOneUseCase.execute(req.user.id);

    if (!user.createdById) {
      const invitedUsers = await this.listUsersInvitedUseCase.execute(
        req.user.id,
      );

      const invitedUserProtocols: ListNameProtocolDto[] = await Promise.all(
        invitedUsers.map(
          (invitedUser) =>
            this.listAllNameProtocolUseCase.execute(invitedUser.id) as Promise<
              ListNameProtocolDto[]
            >,
        ),
      ).then((results) => results.flat());

      const invitedUsersProtocols = await Promise.all(
        invitedUserProtocols.map((protocolInvite) =>
          this.listAllProtocolUseCase.execute(protocolInvite.id),
        ),
      ).then((results) => results.flat());

      const currentUserProtocols =
        await this.listAllNameProtocolUseCase.execute(req.user.id);

      const protocols = await Promise.all(
        currentUserProtocols.map((protocol) =>
          this.listAllProtocolUseCase.execute(protocol.id),
        ),
      );

      const allProtocols = [invitedUsersProtocols, ...protocols];

      return allProtocols.flat();
    } else {
      const currentUserProtocols =
        await this.listAllNameProtocolUseCase.execute(req.user.id);

      const protocols = await Promise.all(
        currentUserProtocols.map((protocol) =>
          this.listAllProtocolUseCase.execute(protocol.id),
        ),
      ).then((results) => results.flat());

      return protocols;
    }
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
