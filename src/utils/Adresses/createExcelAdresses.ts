import { CreateBaseInventarioDto } from 'src/base-inventario/dto/create-base-inventario.dto';
import * as XLSX from 'xlsx';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UploadAdressDto } from 'src/adresses/dto/file-upload.adress.dto';
import { CreateAdressDto } from 'src/adresses/dto/create-adress.dto';

const FIELD_NAMES = {
  codeAdress: 'Endereço',
  descriptionAdress: 'Descrição endereço',
};

export async function createExcelAdresses(
  file: UploadAdressDto,
  name: string,
  id: string,
) {
  const workbook = XLSX.read(file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const dataJson = XLSX.utils.sheet_to_json(sheet);

  function checkColumnsCreateArray(dataJson, FIELD_NAMES) {
    // Obter as chaves do primeiro objeto em dataJson
    const dataJsonKeys = Object.keys(dataJson[0]).sort();

    // Obter as chaves de FIELD_NAMES
    const fieldNamesKeys = Object.values(FIELD_NAMES).sort();

    // Verificar se as chaves correspondem
    if (JSON.stringify(dataJsonKeys) !== JSON.stringify(fieldNamesKeys)) {
      throw new HttpException(
        'As colunas do Excel não correspondem às pre-definidas',
        HttpStatus.BAD_REQUEST,
      );
    }

    const data: CreateAdressDto[] = dataJson.map((datas) => ({
      name,
      codeAdress: datas[FIELD_NAMES.codeAdress],
      descriptionAdress: datas[FIELD_NAMES.descriptionAdress],
      user_id: id,
    }));
    return data;
  }

  return checkColumnsCreateArray(dataJson, FIELD_NAMES);
}
