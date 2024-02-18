export class CreateItemInventarioDto {
  readonly item: string;
  readonly endereco: string;
  readonly descricao?: string;
  readonly firstCount: number;
}
