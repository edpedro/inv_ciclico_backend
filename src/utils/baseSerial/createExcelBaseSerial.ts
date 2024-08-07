import * as XLSX from 'xlsx';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateBaseSerialDto } from 'src/base-serial/dto/create-base-serial.dto';

const FIELD_NAMES = {
  codigo: 'Material',
  serial: 'Nº de série',
  center: 'Cen.',
  deposit: 'Dep.',
  status: 'StatSist',
};

export async function createExcelBaseSerial(file: any, id: string) {
  const buffer = Buffer.from(file.buffer.data);

  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const dataJson = XLSX.utils.sheet_to_json(sheet);

  if (dataJson.length === 0) {
    throw new HttpException(
      'O arquivo Excel está vazio',
      HttpStatus.BAD_REQUEST,
    );
  }

  function checkColumnsCreateArray(dataJson, FIELD_NAMES) {
    const dataJsonKeys = Object.keys(dataJson[0]).sort();
    const fieldNamesKeys = Object.values(FIELD_NAMES).sort();

    if (JSON.stringify(dataJsonKeys) !== JSON.stringify(fieldNamesKeys)) {
      throw new HttpException(
        'As colunas do Excel não correspondem às pre-definidas',
        HttpStatus.BAD_REQUEST,
      );
    }

    const data: CreateBaseSerialDto[] = dataJson.map((datas) => ({
      codigo: String(datas[FIELD_NAMES.codigo]),
      serial: String(datas[FIELD_NAMES.serial]),
      center: datas[FIELD_NAMES.center]
        ? String(datas[FIELD_NAMES.center])
        : null,
      deposit: datas[FIELD_NAMES.deposit]
        ? String(datas[FIELD_NAMES.deposit])
        : null,
      status: datas[FIELD_NAMES.status]
        ? String(datas[FIELD_NAMES.status])
        : null,
      user_id: id,
    }));
    return data;
  }

  return checkColumnsCreateArray(dataJson, FIELD_NAMES);
}
