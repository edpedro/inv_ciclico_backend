export class ListDashboardDto {
  readonly id?: number;
  readonly item?: string;
  readonly descricao?: string;
  readonly endereco?: string;
  readonly tipoEstoque?: string;
  readonly catItem?: string;
  readonly saldoWms?: number;
  readonly price?: number | null;
  readonly firstCount?: number | null;
  readonly secondCount?: number | null;
  readonly firstStatus?: boolean | null;
  readonly secondStatus?: boolean | null;
  readonly created_at?: Date | null;
  readonly updated_at?: Date | null;
  readonly username_id?: string | null;
  readonly baseNameInventario_id?: string;
}
