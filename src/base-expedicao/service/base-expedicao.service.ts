import { FindExpedicaoBaseExpedicaoUseCase } from './../usecases/find-expedicao-baseExpedicao.usecase';
import { FindNameBaseExpedicaoUseCase } from './../usecases/find-name-baseExpedicao.usecase';
import { CreateBaseExpedicaoUseCase } from './../usecases/create-baseExpedicao.usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBaseExpedicaoDto } from '../dto/create-base-expedicao.dto';
import { UpdateBaseExpedicaoDto } from '../dto/update-base-expedicao.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { ListUserOneUseCase } from 'src/users/usecases/list-user-one.usecase';
import { ListUsersInvitedUseCase } from 'src/users/usecases/list-users-invited.usecase';
import { FindNameIdBaseExpedicaoUseCase } from '../usecases/find-id-baseExpedicao.usecase';
import { UpdateBaseExpedicaoUseCase } from '../usecases/update-baseExpedicao.usecase';
import { DeleteBaseExpedicaoUseCase } from '../usecases/delete-baseExpedicao.usecase';
import { UpdateBloackedBaseExpedicaoUseCase } from '../usecases/update-blocked-baseExpedicao.usecase';
import { ListUsersUseCase } from 'src/users/usecases/list-users.usecase';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class BaseExpedicaoService {
  constructor(
    private readonly createBaseExpedicaoUseCase: CreateBaseExpedicaoUseCase,
    private readonly findNameBaseExpedicaoUseCase: FindNameBaseExpedicaoUseCase,
    private readonly findExpedicaoBaseExpedicaoUseCase: FindExpedicaoBaseExpedicaoUseCase,
    private readonly listUserOneUseCase: ListUserOneUseCase,
    private readonly listUsersInvitedUseCase: ListUsersInvitedUseCase,
    private readonly findNameIdBaseExpedicaoUseCase: FindNameIdBaseExpedicaoUseCase,
    private readonly updateBaseExpedicaoUseCase: UpdateBaseExpedicaoUseCase,
    private readonly deleteBaseExpedicaoUseCase: DeleteBaseExpedicaoUseCase,
    private readonly updateBloackedBaseExpedicaoUseCase: UpdateBloackedBaseExpedicaoUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) {}

  async createExpedição(data: CreateBaseExpedicaoDto, req: ReqUserDto) {
    const nameExist = await this.findNameBaseExpedicaoUseCase.execute(
      data.name,
    );

    if (nameExist) {
      throw new HttpException('Nome já cadastrado', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.createBaseExpedicaoUseCase.execute(data, req);

      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não cadastrado', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(req: ReqUserDto) {
    const createId = await this.listUserOneUseCase.execute(req.user.id);

    const userAll = await this.listUsersUseCase.execute();

    const filterUserAdminExits: UserDto[] = [];

    if (createId.createdById) {
      const userExits = userAll.filter(
        (item) =>
          item.createdById === createId.createdById ||
          item.id === createId.createdById,
      );

      filterUserAdminExits.push(...userExits);
    } else {
      const userExits = userAll.filter(
        (item) => item.createdById === createId.id,
      );
      filterUserAdminExits.push(...userExits);
    }

    const userIds = [
      createId.id,
      ...filterUserAdminExits.map((user) => user.id),
    ];

    const result = await this.findExpedicaoBaseExpedicaoUseCase.execute(
      userIds,
    );

    return result;
  }

  async findOne(id: string, req: ReqUserDto) {
    const result = await this.findNameIdBaseExpedicaoUseCase.execute(
      id,
      req.user.id,
    );

    return result;
  }

  async update(
    id: string,
    updateBaseExpedicaoDto: UpdateBaseExpedicaoDto,
    req: ReqUserDto,
  ) {
    const idExist = await this.findNameIdBaseExpedicaoUseCase.execute(
      id,
      req.user.id,
    );

    if (!idExist) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    try {
      const update = await this.updateBaseExpedicaoUseCase.execute(
        updateBaseExpedicaoDto,
        id,
      );

      return update;
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string, req: ReqUserDto) {
    const idExist = await this.findNameIdBaseExpedicaoUseCase.execute(
      id,
      req.user.id,
    );

    if (!idExist) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.deleteBaseExpedicaoUseCase.execute(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não deletado', HttpStatus.BAD_REQUEST);
    }
  }

  async releaseBlocked(id: string, req: ReqUserDto) {
    const idExist = await this.findNameIdBaseExpedicaoUseCase.execute(
      id,
      req.user.id,
    );

    if (!idExist) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    const data = await this.updateBloackedBaseExpedicaoUseCase.execute(
      false,
      id,
    );

    return data;
  }
}
