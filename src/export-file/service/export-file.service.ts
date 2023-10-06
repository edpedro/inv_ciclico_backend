import { ListOneInventarioUseCase } from './../../name-inventario/usecases/list-one-nameInventario.usecase';
import { UsersService } from './../../users/service/users.service';
import { ListBaseInventarioUseCase } from './../usecases/list-base-inventario.export-file.usecase';
import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import * as XLSX from 'xlsx';
import { join } from 'path';
import { addUserNames } from 'src/utils/ExportFile/addUserNames';
import { renameFields } from 'src/utils/ExportFile/renameFields';

@Injectable()
export class ExportFileService {
  constructor(
    private readonly listBaseInventarioUseCase: ListBaseInventarioUseCase,
    private readonly usersService: UsersService,
    private readonly listOneInventarioUseCase: ListOneInventarioUseCase,
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
}
