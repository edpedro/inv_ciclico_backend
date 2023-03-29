export class CreateBaseInventarioDto {
  readonly item: string;
  readonly descricao: string;
  readonly endereco: string;
  readonly tipoEstoque: string;
  readonly catItem: string;
  readonly saldoWms: number;
  readonly saldoFisico?: number;
  readonly status?: boolean;
  readonly baseNameInventario_id: string;
  readonly username_id?: string;
}
