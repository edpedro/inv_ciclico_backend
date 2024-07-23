import * as XLSX from 'xlsx';
import { UploadDto } from '../file-upload.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateBaseSerialDto } from 'src/base-serial/dto/create-base-serial.dto';

const FIELD_NAMES = {
  codigo: 'Material',
  serial: 'Nº de série',
  center: 'Cen.',
  deposit: 'Dep.',
  status: 'StatSist',
};

export async function createExcelBaseSerial(file: UploadDto, id: string) {
  const workbook = XLSX.read(file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const dataJson = XLSX.utils.sheet_to_json(sheet);

  function checkColumnsCreateArray(dataJson, FIELD_NAMES) {
    // Se "price" não estiver nas chaves do Excel, defina um valor padrão
    dataJson.forEach((datas) => {
      !datas[FIELD_NAMES.center] && null;
      !datas[FIELD_NAMES.deposit] && null;
      !datas[FIELD_NAMES.status] && null;
    });

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

    const data: CreateBaseSerialDto[] = dataJson.map((datas) => ({
      codigo: String(datas[FIELD_NAMES.codigo]),
      serial: datas[FIELD_NAMES.serial],
      center: datas[FIELD_NAMES.center],
      deposit: datas[FIELD_NAMES.deposit],
      status: datas[FIELD_NAMES.status],
      user_id: id,
    }));
    return data;
  }

  return checkColumnsCreateArray(dataJson, FIELD_NAMES);
}
