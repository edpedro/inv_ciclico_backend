import { CreateBaseInventarioDto } from 'src/base-inventario/dto/create-base-inventario.dto';
import * as XLSX from 'xlsx';
import { UploadDto } from '../file-upload.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

const FIELD_NAMES = {
  item: 'Item',
  descricao: 'Descricao',
  endereco: 'Endereco',
  tipoEstoque: 'Tip.Estoque',
  catItem: 'Cat.Item',
  saldoWms: 'Dispon.Exped.',
};

export async function createExcelBaseInventario(file: UploadDto, id: string) {
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
        'As colunas do Excel não correspondem às predefinidas',
        HttpStatus.BAD_REQUEST,
      );
    }

    const data: CreateBaseInventarioDto[] = dataJson.map((datas) => ({
      item: String(datas[FIELD_NAMES.item]),
      descricao: datas[FIELD_NAMES.descricao],
      endereco: datas[FIELD_NAMES.endereco],
      tipoEstoque: datas[FIELD_NAMES.tipoEstoque],
      catItem: datas[FIELD_NAMES.catItem],
      saldoWms: datas[FIELD_NAMES.saldoWms],
      baseNameInventario_id: id,
    }));
    return data;
  }

  return checkColumnsCreateArray(dataJson, FIELD_NAMES);
}
