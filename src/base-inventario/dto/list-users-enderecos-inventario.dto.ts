export class ListUsersEndInventarioDto {
  readonly id: number;
  readonly endereco: string;
  readonly baseNameInventario_id: string;
  readonly users: {
    user: {
      id: string;
      name: string;
    };
  }[];
}
