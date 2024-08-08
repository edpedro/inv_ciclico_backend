export class ListProtocolExportFileDto {
  readonly codigo: string;
  readonly serial: string;
  readonly caixa: number;
  readonly nameProtocols: {
    name: string;
    date: string;
    user: {
      name: string;
    };
  };
}
