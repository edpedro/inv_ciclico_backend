export class ListBaseExpedicaoDto {
  readonly id: string;
  readonly name: string;
  readonly date: string;
  readonly status: string;
  readonly blocked: boolean;
  readonly uploadPDF: boolean;
  readonly uploadExcel: boolean;
  readonly create_id: string;
  readonly user?: {
    name: string;
  };
}
