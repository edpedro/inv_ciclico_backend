import { ListOneInventarioUseCase } from './../../name-inventario/usecases/list-one-nameInventario.usecase';
import { UsersService } from './../../users/service/users.service';
import { ListBaseInventarioUseCase } from '../usecases/list-base-protocol.export-file.usecase';
import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import * as XLSX from 'xlsx';
import { join } from 'path';
import { addUserNames } from 'src/utils/ExportFile/addUserNames';
import { renameFields } from 'src/utils/ExportFile/renameFields';
import { ListIdNameProtocolUseCase } from 'src/name-protocol/usecases/list-id-nameProtocol.usecase';
import { ListIdProtocolUseCase } from 'src/base-protocol/usecases/list-id-baseProtocol.usecase';
import { renameProtocolsFields } from 'src/utils/ExportFile/renameProtocolsFields';
import { FindIdExpedicaoBaseNotaFiscalUseCase } from 'src/base-notafiscal/usecases/find-idExpedicao-baseNotaFiscal.usecase';
import { renameExpedicaoFields } from 'src/utils/ExportFile/renameExpedicaoFields';
import { ListBaseExpedicaoUseCase } from '../usecases/list-base-ecpedicao.export-file.usecase';

@Injectable()
export class ExportFileService {
  constructor(
    private readonly listBaseInventarioUseCase: ListBaseInventarioUseCase,
    private readonly usersService: UsersService,
    private readonly listOneInventarioUseCase: ListOneInventarioUseCase,
    private readonly listIdNameProtocolUseCase: ListIdNameProtocolUseCase,
    private readonly listIdProtocolUseCase: ListIdProtocolUseCase,
    private readonly findIdExpedicaoBaseNotaFiscalUseCase: FindIdExpedicaoBaseNotaFiscalUseCase,
    private readonly listBaseExpedicaoUseCase: ListBaseExpedicaoUseCase,
  ) {}

  async exportFicha(id: string, @Res() res: Response) {
    const nameInvExists = await this.listOneInventarioUseCase.execute(id);
    const user = await this.usersService.findAllUsers();

    if (!nameInvExists) {
      throw new HttpException('Nome não encontrados', HttpStatus.BAD_REQUEST);
    }

    const baseInvExists = await this.listBaseInventarioUseCase.execute(id);

    if (baseInvExists.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    const sheetResult = await addUserNames(user, baseInvExists);

    const renamedResults = await renameFields(sheetResult);

    const ws = XLSX.utils.json_to_sheet(renamedResults);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'ficha.xlsx');

    const file = join(__dirname, '..', '..', '..', 'ficha.xlsx');
    res.download(
      file,
      `ficha_${nameInvExists.name}-${nameInvExists.date}.xlsx`,
    );

    return sheetResult;
  }

  async exportProtocol(id: string, @Res() res: Response) {
    const nameProtocolsExists = await this.listIdNameProtocolUseCase.execute(
      id,
    );

    if (!nameProtocolsExists) {
      throw new HttpException('Nome não encontrados', HttpStatus.BAD_REQUEST);
    }

    const baseProtocolsExists = await this.listIdProtocolUseCase.execute(id);

    if (baseProtocolsExists.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    const renamedResults = await renameProtocolsFields(baseProtocolsExists);

    const ws = XLSX.utils.json_to_sheet(renamedResults);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'protocolo.xlsx');

    const file = join(__dirname, '..', '..', '..', 'protocolo.xlsx');
    res.download(
      file,
      `protocolo_${nameProtocolsExists.name}-${nameProtocolsExists.date}.xlsx`,
    );

    return renamedResults;
  }

  async exportProtocolExpedicao(id: string, @Res() res: Response) {
    const nameExpedicaoExists = await this.listBaseExpedicaoUseCase.execute(id);

    if (!nameExpedicaoExists) {
      throw new HttpException('Nome não encontrados', HttpStatus.BAD_REQUEST);
    }

    const notafiscal = await this.findIdExpedicaoBaseNotaFiscalUseCase.execute(
      id,
    );

    if (notafiscal.length <= 0) {
      throw new HttpException('Dados não encontrados', HttpStatus.BAD_REQUEST);
    }

    const renamedResults = await renameExpedicaoFields(notafiscal);

    const ws = XLSX.utils.json_to_sheet(renamedResults);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'expedicao.xlsx');

    const file = join(__dirname, '..', '..', '..', 'expedicao.xlsx');
    res.download(
      file,
      `expedicao_${nameExpedicaoExists.name}-${nameExpedicaoExists.date}.xlsx`,
    );

    return renamedResults;
  }
}
