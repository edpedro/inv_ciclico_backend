import { UpdateNameInventarioUseCase } from './../usecases/update-nameInventario';
import { DeleteNameInventarioUseCase } from './../usecases/delete-nameInventario';
import { DeleteFkNameInventarioUseCase } from './../usecases/delete-fk-nameInventario';
import { ListIdNameUseCase } from './../usecases/list-id-nameInventario.usecase';
import { CreateNameInventarioUseCase } from './../usecases/create-nameInventario.usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNameInventarioDto } from '../dto/create-name-inventario.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { UsersService } from 'src/users/service/users.service';
import { ListOneNameInventarioUseCase } from '../usecases/list-one-user-nameInventario.usecase';
import { ListAllNameInventarioUseCase } from '../usecases/list-all-nameInventario.usecase';
import { ListDashNameInventarioUseCase } from '../usecases/list-dash-nameInventario.usecase';
import { UpdateNameInventarioDto } from '../dto/update-name-inventario.dto';
import { CreateFkNameInventarioUseCase } from '../usecases/create-fk-nameInventario';

@Injectable()
export class NameInventarioService {
  constructor(
    private readonly usersService: UsersService,
    private readonly listOneNameInventarioUseCase: ListOneNameInventarioUseCase,
    private readonly createNameInventarioUseCase: CreateNameInventarioUseCase,
    private readonly listIdNameUseCase: ListIdNameUseCase,
    private readonly listAllNameInventarioUseCase: ListAllNameInventarioUseCase,
    private readonly listDashNameInventarioUseCase: ListDashNameInventarioUseCase,
    private readonly deleteFkNameInventarioUseCase: DeleteFkNameInventarioUseCase,
    private readonly deleteNameInventarioUseCase: DeleteNameInventarioUseCase,
    private readonly createFkNameInventarioUseCase: CreateFkNameInventarioUseCase,
    private readonly updateNameInventarioUseCase: UpdateNameInventarioUseCase,
  ) {}

  async createName(data: CreateNameInventarioDto, req: ReqUserDto) {
    const { user_id, name } = data;

    if (user_id !== undefined && user_id !== null && user_id.length > 0) {
      const usersIds = await this.usersService.getUsersByIds(data.user_id);

      if (usersIds.length <= 0) {
        throw new HttpException(
          'Usuario não encontrados',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const nameExist = await this.listOneNameInventarioUseCase.execute(
      name,
      req,
    );

    if (nameExist) {
      throw new HttpException(
        'Nome do inventario já cadastrado',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const createName = await this.createNameInventarioUseCase.execute(
        data,
        req,
      );

      return createName;
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não cadastrado', HttpStatus.BAD_REQUEST);
    }
  }

  async findIdName(id: string, req: ReqUserDto) {
    const nameInv = await this.listIdNameUseCase.execute(id, req);

    if (!nameInv) {
      throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
    }

    return nameInv;
  }

  async findAllName(req: any) {
    const nameInv = await this.listAllNameInventarioUseCase.execute(req);

    if (!nameInv) {
      throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
    }

    return nameInv;
  }
  async findAllDash() {
    const nameInv = await this.listDashNameInventarioUseCase.execute();

    if (!nameInv) {
      throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
    }

    return nameInv;
  }

  async removeName(id: string, req: ReqUserDto) {
    try {
      const nameInv = await this.listIdNameUseCase.execute(id, req);

      if (!nameInv) {
        throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
      }

      await this.deleteFkNameInventarioUseCase.execute(nameInv.id);

      await this.deleteNameInventarioUseCase.execute(nameInv.id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não deletado', HttpStatus.BAD_REQUEST);
    }
  }
  async updateName(id: string, data: UpdateNameInventarioDto, req: ReqUserDto) {
    try {
      const nameInv = await this.listIdNameUseCase.execute(id, req);

      if (!nameInv) {
        throw new HttpException('Dados não encontrado', HttpStatus.BAD_REQUEST);
      }

      await this.updateNameInventarioUseCase.execute(id, data);

      await this.deleteFkNameInventarioUseCase.execute(nameInv.id);

      await this.createFkNameInventarioUseCase.execute(nameInv.id, data);

      return await this.listIdNameUseCase.execute(nameInv.id, req);
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }
}
