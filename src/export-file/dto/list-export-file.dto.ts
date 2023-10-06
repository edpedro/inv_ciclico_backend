export class ListExportFileDto {
  readonly item: string;
  readonly descricao: string;
  readonly endereco: string;
  readonly tipoEstoque: string;
  readonly catItem: string;
  readonly saldoWms: number;
  readonly saldoFisico?: number;
  readonly firstCount: number;
  readonly secondCount: number;
  readonly firstStatus?: boolean;
  readonly secondStatus?: boolean;
  readonly username_id?: string;
}
