export class CreateNameInventarioDto {
  readonly name: string;
  readonly date: string;
  readonly user_id: string[];
  readonly status?: boolean;
}
