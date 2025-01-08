import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBaseExpedicaoDto {
  @IsString({ message: "O campo 'Nome' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Nome' não pode estar vazio." })
  readonly name: string;

  @IsString({ message: "O campo 'Data' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Data' não pode estar vazio." })
  readonly date: string;

  @IsOptional()
  readonly status?: string;

  @IsOptional()
  readonly uploadPDF?: boolean;

  @IsOptional()
  readonly uploadExcel?: boolean;

  readonly create_id: string;
}
