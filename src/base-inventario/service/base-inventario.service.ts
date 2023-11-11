import { UpdateUploadNameInventarioUseCase } from './../../name-inventario/usecases/update-upload-nameInventario.usecase';
import { HistoryBaseInventarioUseCase } from './../usecases/find-history-base-inventario.usecase';
import { UpdateWmsBaseInventarioUseCase } from './../usecases/update-wms-base-inventario.usecase';
import { UpdateFirtsSecondNameInventarioUseCase } from './../../name-inventario/usecases/update-firsSecond-nameInventario.usecase';
import { UpdateBaseInventarioUseCase } from './../usecases/update-base-inventario.usecase';
import { ListUniqueBaseInventarioUseCase } from './../usecases/list-unique-base-inventario.usecase';
import { RemoveBaseInventarioUseCase } from './../usecases/remove-base-inventario.usecase';
import { ListItemBaseInventarioUseCase } from './../usecases/list-item-inventario.usecase';
import { ListEnderecoBaseInventarioUseCase } from './../usecases/list-endereco-inventario.usecase';
import { ListAllBaseInventarioUseCase } from './../usecases/list-all-inventario.usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UploadDto } from 'src/utils/file-upload.dto';
import { createExcelBaseInventario } from 'src/utils/baseInventario/createExcelBaseInventario';
import { ListOneNameBaseInventarioUseCase } from 'src/name-inventario/usecases/list-base-nameInventario.usecase';
import { ListBaseInventarioUseCase } from '../usecases/list-base-inventario.usecase';
import { CreateBaseInventarioUseCase } from '../usecases/create-base-inventario.usecase';
import { ListEnderecoDto } from '../dto/list-endereco.dto';
import { ListItemDto } from '../dto/list-item.dto';
import { UpdateStatusNameInventarioUseCase } from 'src/name-inventario/usecases/update-status-nameInventario.usecase';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { UpdateBaseInventarioDto } from '../dto/update-base-inventario.dto';
import { ListUserOnNameInventarioUseCase } from '../usecases/list-user-fk-name-inventario.usecase';
import { CreateBaseInventarioDto } from '../dto/create-base-inventario.dto';
import { ListUserNameBaseInventarioUseCase } from 'src/name-inventario/usecases/list-user-nameInventario.usecase';
import { ListOnItemInventarioUseCase } from '../usecases/list-on-item-inventario.usecase';
import { UpdateSecondBaseInventarioUseCase } from '../usecases/update-second-base-inventario.usecase';
import { UpdateWmsInventarioDto } from '../dto/update-wms-inventario.dto';
import { ListItemHistoricoDto } from '../dto/list-historico.item.dto';
import { AlocateEnderecoUser } from '../dto/alocate-endereco-inventario.dto';
import { ListUserOnInventarioUserUseCase } from '../usecases/list-inv-user-inventario.usecase';
import { ListAllArrayEndereco } from '../usecases/list-all-array-endereco-inventario.usecase';
import { AlocateUserInventario } from '../usecases/alocate-user-inventario.usecase';

@Injectable()
export class BaseInventarioService {
  constructor(
    private readonly listOneNameBaseInventarioUseCase: ListOneNameBaseInventarioUseCase,
    private readonly listBaseInventarioUseCase: ListBaseInventarioUseCase,
    private readonly createBaseInventarioUseCase: CreateBaseInventarioUseCase,
    private readonly listAllBaseInventarioUseCase: ListAllBaseInventarioUseCase,
    private readonly listEnderecoBaseInventarioUseCase: ListEnderecoBaseInventarioUseCase,
    private readonly listItemBaseInventarioUseCase: ListItemBaseInventarioUseCase,
    private readonly removeBaseInventarioUseCase: RemoveBaseInventarioUseCase,
    private readonly updateStatusNameInventarioUseCase: UpdateStatusNameInventarioUseCase,
    private readonly listUserOnNameInventarioUseCase: ListUserOnNameInventarioUseCase,
    private readonly listUniqueBaseInventarioUseCase: ListUniqueBaseInventarioUseCase,
    private readonly updateBaseInventarioUseCase: UpdateBaseInventarioUseCase,
    private readonly updateFirtsSecondNameInventarioUseCase: UpdateFirtsSecondNameInventarioUseCase,
    private readonly listUserNameBaseInventarioUseCase: ListUserNameBaseInventarioUseCase,
    private readonly ListOnItemInventarioUseCase: ListOnItemInventarioUseCase,
    private readonly updateSecondBaseInventarioUseCase: UpdateSecondBaseInventarioUseCase,
    private readonly updateWmsBaseInventarioUseCase: UpdateWmsBaseInventarioUseCase,
    private readonly historyBaseInventarioUseCase: HistoryBaseInventarioUseCase,
    private readonly updateUploadNameInventarioUseCase: UpdateUploadNameInventarioUseCase,
    private readonly listInventarioUserUseCase: ListBaseInventarioUseCase,
    private readonly listUserOnInventarioUserUseCase: ListUserOnInventarioUserUseCase,
    private readonly listAllArrayEndereco: ListAllArrayEndereco,
    private readonly alocateUserInventario: AlocateUserInventario,
  ) {}

  async uploadInventario(file: UploadDto, dataInventario: UploadDto, req: any) {
    const nameInvExists = await this.listOneNameBaseInventarioUseCase.execute(
      dataInventario.baseNameInventario_id,
      req.user.id,
    );

    if (!nameInvExists) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    const baseInvExists = await this.listBaseInventarioUseCase.execute(
      nameInvExists.id,
    );

    if (baseInvExists) {
      throw new HttpException('Nome já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const data = await createExcelBaseInventario(
      file,
      dataInventario.baseNameInventario_id,
    );

    const createInventario = await this.createBaseInventarioUseCase.execute(
      data,
    );

    await this.updateUploadNameInventarioUseCase.execute(
      dataInventario.baseNameInventario_id,
    );

    return createInventario;
  }

  async listBaseInventario(id: string) {
    const baseInvExists = await this.listAllBaseInventarioUseCase.execute(id);

    if (baseInvExists.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    return baseInvExists;
  }
  async listTotalEndereco(id: string) {
    const baseInvExists = await this.listAllBaseInventarioUseCase.execute(id);

    if (baseInvExists.length <= 0) {
      throw new HttpException(
        'Endereco não encontrados',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = baseInvExists.reduce((accumulator, current) => {
      const enderecoExistente = accumulator.find(
        (e) => e.endereco === current.endereco,
      );

      if (enderecoExistente) {
        enderecoExistente.item += 1;
        enderecoExistente.firstStatus =
          enderecoExistente.firstStatus && current.firstStatus;
        enderecoExistente.secondStatus =
          enderecoExistente.secondStatus && current.secondStatus;
      } else {
        accumulator.push({
          id: current.id,
          endereco: current.endereco,
          item: 1,
          firstStatus: current.firstStatus,
          secondStatus: current.secondStatus,
          baseNameInventario_id: current.baseNameInventario_id,
        });
      }

      return accumulator;
    }, []);

    return result;
  }

  async listEndereco(data: ListEnderecoDto, id: string) {
    const baseInvExists = await this.listEnderecoBaseInventarioUseCase.execute(
      data,
      id,
    );

    if (baseInvExists.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    return baseInvExists;
  }
  async listItem(data: ListItemDto, id: string) {
    const baseInvExists = await this.listItemBaseInventarioUseCase.execute(
      data,
      id,
    );

    if (baseInvExists.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    return baseInvExists;
  }

  async removeInventario(id: string, req: ReqUserDto) {
    try {
      const nameInvExists = await this.listOneNameBaseInventarioUseCase.execute(
        id,
        req.user.id,
      );

      if (!nameInvExists) {
        throw new HttpException(
          'Dados não encontrados',
          HttpStatus.BAD_REQUEST,
        );
      }
      const result = await this.removeBaseInventarioUseCase.execute(id);

      await this.updateStatusNameInventarioUseCase.execute(id);

      return result;
    } catch (error) {
      throw new HttpException('Dados não deletado', HttpStatus.BAD_REQUEST);
    }
  }

  async updateInventario(data: UpdateBaseInventarioDto, id: string, req: any) {
    try {
      const nameInvExists = await this.listUserOnNameInventarioUseCase.execute(
        req,
      );

      if (!nameInvExists) {
        throw new HttpException(
          'Dados não encontrados',
          HttpStatus.BAD_REQUEST,
        );
      }
      const totalInvExists = await this.listUniqueBaseInventarioUseCase.execute(
        data.id,
        id,
      );

      if (!totalInvExists) {
        throw new HttpException(
          'Dados não encontrados',
          HttpStatus.BAD_REQUEST,
        );
      }

      let newData: CreateBaseInventarioDto;

      const updateData = async (data) => {
        const result = await this.updateBaseInventarioUseCase.execute(
          data,
          totalInvExists.id,
          req,
        );
        return result;
      };

      if (totalInvExists.firstStatus === false) {
        const secondStatus =
          totalInvExists.saldoWms !== data.saldoFisico ? false : true;

        newData = await updateData({
          firstCount: data.saldoFisico,
          firstStatus: true,
          secondStatus,
        });
      } else {
        if (totalInvExists.secondStatus === false) {
          newData = await updateData({
            secondCount: data.saldoFisico,
            secondStatus: true,
          });
        }
      }

      const inventarios = await this.listAllBaseInventarioUseCase.execute(id);

      const updateFirtsSecond = async (newData) => {
        const result =
          await this.updateFirtsSecondNameInventarioUseCase.execute(
            id,
            newData,
          );
        return result;
      };

      const resultfirstStatus = inventarios.every((inventario) => {
        return inventario.firstStatus;
      });

      if (resultfirstStatus) {
        await updateFirtsSecond({ firstStatus: true, secondStatus: false });
      }

      const resultsecondStatus = inventarios.every((inventario) => {
        return inventario.secondStatus;
      });

      if (resultsecondStatus) {
        await updateFirtsSecond({ secondStatus: true });
      }
      return newData;
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }
  async updateAdminSecondCount(
    data: UpdateBaseInventarioDto,
    id: string,
    req: any,
  ) {
    try {
      const nameInvExists =
        await this.listUserNameBaseInventarioUseCase.execute(req);

      if (!nameInvExists) {
        throw new HttpException(
          'Atualização não autorizada',
          HttpStatus.BAD_REQUEST,
        );
      }
      const totalInvExists = await this.ListOnItemInventarioUseCase.execute(
        data.id,
      );

      if (!totalInvExists) {
        throw new HttpException(
          'Dados não encontrados',
          HttpStatus.BAD_REQUEST,
        );
      }

      let newData: CreateBaseInventarioDto;

      if (totalInvExists.secondStatus !== true) {
        throw new HttpException(
          'Atualização não autorizada',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (totalInvExists.secondStatus === true) {
        const updateSecond =
          await this.updateSecondBaseInventarioUseCase.execute(
            totalInvExists.id,
            req,
            data,
          );

        newData = updateSecond;
      }

      return newData;
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }
  async updateAdminWMS(
    data: UpdateWmsInventarioDto,
    id: string,
    req: ReqUserDto,
  ) {
    try {
      const nameInvExists =
        await this.listUserNameBaseInventarioUseCase.execute(req);

      if (!nameInvExists) {
        throw new HttpException(
          'Atualização não autorizada',
          HttpStatus.BAD_REQUEST,
        );
      }

      const totalInvExists = await this.ListOnItemInventarioUseCase.execute(
        data.id,
      );

      if (!totalInvExists) {
        throw new HttpException(
          'Dados não encontrados',
          HttpStatus.BAD_REQUEST,
        );
      }
      const updateSecond = await this.updateWmsBaseInventarioUseCase.execute(
        totalInvExists.id,
        data,
      );

      return updateSecond;
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }
  async allHistoryItem(data: ListItemHistoricoDto) {
    const totalInvExists = await this.historyBaseInventarioUseCase.execute(
      data,
    );

    return totalInvExists;
  }

  async alocateEnderecoUser(data: AlocateEnderecoUser, id: string) {
    const invExists = await this.listInventarioUserUseCase.execute(id);

    if (!invExists) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }
    const userOnInvExists = await this.listUserOnInventarioUserUseCase.execute(
      id,
      data.username_id,
    );

    if (!userOnInvExists) {
      throw new HttpException(
        'Usuario não alocado para Inventario',
        HttpStatus.BAD_REQUEST,
      );
    }

    const enderecoExists = await this.listAllArrayEndereco.execute(data, id);

    if (enderecoExists.length <= 0) {
      throw new HttpException(
        'Enderecos não encontrados',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const result = await this.alocateUserInventario.execute(data, id);

      return result;
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }
}
