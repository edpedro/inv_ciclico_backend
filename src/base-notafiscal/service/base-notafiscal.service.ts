import { UpdatePDFBaseExpedicaoUseCase } from './../../base-expedicao/usecases/update-pdf-baseExpedicao.usecase';
import { RemoveBaseNotaFiscalUseCase } from './../usecases/remove-baseNotaFiscal.usecase';
import { RemoveNumberBaseNotaFiscalUseCase } from './../usecases/remove-number-baseNotaFiscal.usecase';
import { UpdateExcelBaseExpedicaoUseCase } from './../../base-expedicao/usecases/update-excel-baseExpedicao.usecase';
import { FindNumberBaseNotaFiscalUseCase } from './../usecases/find-number-baseNotaFiscal.usecase';
import { CreateBaseNotaFiscalUseCase } from './../usecases/create-baseNotaFiscal.usecase';
import { PdfExtractorUtils } from './../../utils/notafiscal/NotaFiscalExtractor';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBaseNotafiscalDto } from '../dto/create-base-notafiscal.dto';
import { UploadPDFDto } from 'src/utils/file-upload.dto';
import { FindNameIdBaseExpedicaoUseCase } from 'src/base-expedicao/usecases/find-id-baseExpedicao.usecase';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { ListUserOneUseCase } from 'src/users/usecases/list-user-one.usecase';
import { ListUsersInvitedUseCase } from 'src/users/usecases/list-users-invited.usecase';
import { FindAllBaseNotaFiscalUseCase } from '../usecases/find-all-baseNotaFiscal.usecase';
import { FindIdExpedicaoBaseNotaFiscalUseCase } from '../usecases/find-idExpedicao-baseNotaFiscal.usecase';
import { FindNumberaseNotafiscalDto } from '../dto/find-base-notafiscal.dto';
import { UpdateBaseNotafiscalDto } from '../dto/update-base-notafiscal.dto';
import { FindIdBaseNotaFiscalUseCase } from '../usecases/find-id-baseNotaFiscal.usecase';
import { UpdateConferenceBaseNotaFiscalUseCase } from '../usecases/update-conference-baseNotaFiscal.usecase';
import { UpdateStatusBaseExpedicaoUseCase } from 'src/base-expedicao/usecases/update-status-baseExpedicao.usecase';
import { UpdateDateCurrentBaseExpedicaoUseCase } from 'src/base-expedicao/usecases/update-date-baseExpedicao.usecase';
import { UpdateBloackedBaseExpedicaoUseCase } from 'src/base-expedicao/usecases/update-blocked-baseExpedicao.usecase';
import { ListBaseNotafiscalDto } from '../dto/list-base-notafiscal.dto';

interface UINumberFiscal {
  numberNF: string;
}

interface UIStatusFiscal {
  idExpedicao: string;
  numberNF: string;
  status: string;
}

@Injectable()
export class BaseNotafiscalService {
  constructor(
    private readonly pdfExtractorUtils: PdfExtractorUtils,
    private readonly findNameIdBaseExpedicaoUseCase: FindNameIdBaseExpedicaoUseCase,
    private readonly createBaseNotaFiscalUseCase: CreateBaseNotaFiscalUseCase,
    private readonly findNumberBaseNotaFiscalUseCase: FindNumberBaseNotaFiscalUseCase,
    private readonly listUserOneUseCase: ListUserOneUseCase,
    private readonly listUsersInvitedUseCase: ListUsersInvitedUseCase,
    private readonly findAllBaseNotaFiscalUseCase: FindAllBaseNotaFiscalUseCase,
    private readonly findIdExpedicaoBaseNotaFiscalUseCase: FindIdExpedicaoBaseNotaFiscalUseCase,
    private readonly updateExcelBaseExpedicaoUseCase: UpdateExcelBaseExpedicaoUseCase,
    private readonly removeNumberBaseNotaFiscalUseCase: RemoveNumberBaseNotaFiscalUseCase,
    private readonly removeBaseNotaFiscalUseCase: RemoveBaseNotaFiscalUseCase,
    private readonly findIdBaseNotaFiscalUseCase: FindIdBaseNotaFiscalUseCase,
    private readonly updateConferenceBaseNotaFiscalUseCase: UpdateConferenceBaseNotaFiscalUseCase,
    private readonly updateStatusBaseExpedicaoUseCase: UpdateStatusBaseExpedicaoUseCase,
    private readonly updateDateCurrentBaseExpedicaoUseCase: UpdateDateCurrentBaseExpedicaoUseCase,
    private readonly updatePDFBaseExpedicaoUseCase: UpdatePDFBaseExpedicaoUseCase,
    private readonly updateBloackedBaseExpedicaoUseCase: UpdateBloackedBaseExpedicaoUseCase,
  ) {}

  async createNotaFiscal(
    files: Express.Multer.File[],
    data: UploadPDFDto,
    req: ReqUserDto,
  ) {
    const idExists = await this.findNameIdBaseExpedicaoUseCase.execute(
      data.baseExpedicao_id,
      req.user.id,
    );

    if (!idExists) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    function converterParaNumber(value: string) {
      const number = value.replace(/\./g, '').replace(',', '.');

      return parseFloat(number);
    }

    const registerNotaFiscals: CreateBaseNotafiscalDto[] = [];
    const numberNotaFsical: UINumberFiscal[] = [];

    for (const file of files) {
      const dataExtract = await this.pdfExtractorUtils.extractDataFromPDF(
        file.buffer,
      );

      const idExist = await this.findNumberBaseNotaFiscalUseCase.execute(
        dataExtract.numeroNF,
      );

      if (numberNotaFsical.length > 0) {
        const existNF = numberNotaFsical.some(
          (item) => item.numberNF === dataExtract.numeroNF,
        );

        if (!existNF) {
          numberNotaFsical.push({ numberNF: dataExtract.numeroNF });

          const newNotaFiscal: CreateBaseNotafiscalDto[] =
            dataExtract.itens.map((datas) => ({
              number: dataExtract.numeroNF,
              codigo: datas.codigo,
              description: datas.descricao,
              quantityNF: converterParaNumber(datas.quantidade),
              totalValue: converterParaNumber(datas.valorTotal),
              supply: dataExtract.fornecimento,
              status: 'Pendente',
              baseExpedicao_id: data.baseExpedicao_id,
              user_id: req.user.id,
            }));

          if (!idExist) {
            registerNotaFiscals.push(...newNotaFiscal);
          }
        }
      } else {
        numberNotaFsical.push({ numberNF: dataExtract.numeroNF });

        const newNotaFiscal: CreateBaseNotafiscalDto[] = dataExtract.itens.map(
          (datas) => ({
            number: dataExtract.numeroNF,
            codigo: datas.codigo,
            description: datas.descricao,
            quantityNF: converterParaNumber(datas.quantidade),
            totalValue: converterParaNumber(datas.valorTotal),
            supply: dataExtract.fornecimento,
            status: 'Pendente',
            baseExpedicao_id: data.baseExpedicao_id,
            user_id: req.user.id,
          }),
        );

        if (!idExist) {
          registerNotaFiscals.push(...newNotaFiscal);
        }
      }
    }

    try {
      const result = await this.createBaseNotaFiscalUseCase.execute(
        registerNotaFiscals,
      );
      await this.updateExcelBaseExpedicaoUseCase.execute(
        true,
        data.baseExpedicao_id,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não cadastrado', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllNotaFiscal(req: ReqUserDto) {
    const createId = await this.listUserOneUseCase.execute(req.user.id);
    const invited = await this.listUsersInvitedUseCase.execute(createId.id);

    const userIds = [createId.id, ...invited.map((user) => user.id)];

    const result = await this.findAllBaseNotaFiscalUseCase.execute(userIds);

    return result;
  }

  async findOneExpedicao(idExpedicao: string, req: ReqUserDto) {
    const idExists = await this.findNameIdBaseExpedicaoUseCase.execute(
      idExpedicao,
      req.user.id,
    );

    if (!idExists) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    const result = await this.findIdExpedicaoBaseNotaFiscalUseCase.execute(
      idExpedicao,
    );

    return result;
  }

  async findIdStatusNotaFsical(idExpedicao: string, req: ReqUserDto) {
    const idExists = await this.findNameIdBaseExpedicaoUseCase.execute(
      idExpedicao,
      req.user.id,
    );

    if (!idExists) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    const result = await this.findIdExpedicaoBaseNotaFiscalUseCase.execute(
      idExpedicao,
    );

    const uniqueData = result.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.number === item.number),
    );

    const notafiscalStatus: ListBaseNotafiscalDto[] = [];

    for (const nota of uniqueData) {
      const statusNF = verificarStatus(result, nota.number);
      notafiscalStatus.push({
        ...nota,
        status: statusNF,
      });
    }

    function verificarStatus(itens: ListBaseNotafiscalDto[], number: string) {
      // Filtra apenas os itens relacionados ao número fornecido
      const itensFiltrados = itens.filter((item) => item.number === number);

      if (itensFiltrados.some((item) => item.status === 'divergencia')) {
        return 'divergencia';
      } else if (itensFiltrados.every((item) => item.status === 'Pendente')) {
        return 'pendente';
      } else if (itensFiltrados.every((item) => item.status === 'conferido')) {
        return 'conferido';
      } else {
        return 'conferencia';
      }
    }

    return notafiscalStatus;
  }

  async removeNumberNotaFsical(
    data: FindNumberaseNotafiscalDto,
    req: ReqUserDto,
  ) {
    const idExist = await this.findNumberBaseNotaFiscalUseCase.execute(
      data.number,
    );

    if (!idExist) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.removeNumberBaseNotaFiscalUseCase.execute(
        data.number,
        req.user.id,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não deletado', HttpStatus.BAD_REQUEST);
    }
  }

  async removeNotaFsical(idExpedicao: string, req: ReqUserDto) {
    const idExist = await this.findNameIdBaseExpedicaoUseCase.execute(
      idExpedicao,
      req.user.id,
    );

    if (!idExist) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.removeBaseNotaFiscalUseCase.execute(
        idExpedicao,
        req.user.id,
      );

      await this.updateStatusBaseExpedicaoUseCase.execute(
        'Pendente',
        idExpedicao,
      );

      await this.updateBloackedBaseExpedicaoUseCase.execute(false, idExpedicao);

      await this.updatePDFBaseExpedicaoUseCase.execute(false, idExpedicao);

      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não deletado', HttpStatus.BAD_REQUEST);
    }
  }

  async updateConference(
    data: UpdateBaseNotafiscalDto,
    id: number,
    req: ReqUserDto,
  ) {
    const idExtis = await this.findIdBaseNotaFiscalUseCase.execute(id);

    if (!idExtis) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    if (idExtis.quantityNF === data.quantityPhysical) {
      data.status = 'conferido';
    } else {
      data.status = 'divergencia';
    }

    const dateUpdateCurrent = new Date().toISOString();

    data.conference_user = req.user.name;
    data.updated_at = dateUpdateCurrent;

    try {
      const result = await this.updateConferenceBaseNotaFiscalUseCase.execute(
        data,
        id,
      );

      const allBaseNotaFiscal =
        await this.findIdExpedicaoBaseNotaFiscalUseCase.execute(
          result.baseExpedicao_id,
        );

      if (data.status === 'divergencia') {
        await this.updateBloackedBaseExpedicaoUseCase.execute(
          true,
          result.baseExpedicao_id,
        );
        await this.updateStatusBaseExpedicaoUseCase.execute(
          'divergencia',
          result.baseExpedicao_id,
        );
      } else {
        const allSameSatatus = allBaseNotaFiscal.every(
          (item) => item.status !== 'divergencia',
        );

        if (allSameSatatus) {
          await this.updateStatusBaseExpedicaoUseCase.execute(
            'conferencia',
            result.baseExpedicao_id,
          );
        }
      }

      await this.updateDateCurrentBaseExpedicaoUseCase.execute(
        dateUpdateCurrent,
        result.baseExpedicao_id,
      );

      const allSameSatatus = allBaseNotaFiscal.every(
        (item) => item.status === 'conferido',
      );
      if (allSameSatatus) {
        const result = allBaseNotaFiscal.every(
          (value) => value.quantityNF === value.quantityPhysical,
        );
        if (result) {
          await this.updateStatusBaseExpedicaoUseCase.execute(
            'conferido',
            allBaseNotaFiscal[0].baseExpedicao_id,
          );
        } else {
          await this.updateStatusBaseExpedicaoUseCase.execute(
            'divergencia',
            allBaseNotaFiscal[0].baseExpedicao_id,
          );
        }
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }
}
