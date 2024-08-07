export class ListSerialDto {
  readonly id: number;

  readonly codigo: string;

  readonly serial: string;

  readonly center?: string;

  readonly deposit?: string;

  readonly status?: string;

  readonly nameProtocols?: string;

  readonly caixa?: number;

  readonly user?: {
    id: string;
    name: string;
    username: string;
    role: string;
  };
}
