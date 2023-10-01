export class ListNameInventarioDto {
  readonly id: string;
  readonly name: string;
  readonly date: string;
  readonly user_id?: string[];
  readonly created_at?: Date;
  readonly status?: boolean;
}
