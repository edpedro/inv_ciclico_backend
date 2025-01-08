import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBaseNotafiscalDto {
  @IsString({ message: "O campo 'codigo' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'codigo' não pode estar vazio." })
  readonly number: string;

  @IsString({ message: "O campo 'descricao' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'descricao' não pode estar vazio." })
  readonly codigo: string;

  @IsString({ message: "O campo 'descricao' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'descricao' não pode estar vazio." })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty({ message: "O campo 'quantidade' não pode estar vazio." })
  readonly quantityNF: number;

  @IsNumber()
  @IsNotEmpty({ message: "O campo 'quantidade' não pode estar vazio." })
  readonly totalValue: number;

  @IsOptional()
  readonly quantityPhysical?: number;

  @IsString({ message: "O campo 'supply' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'supply' não pode estar vazio." })
  readonly supply: string;

  @IsString({ message: "O campo 'status' deve ser uma string." })
  status: string;

  @IsString({ message: "O campo 'baseExpedicao_id' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'baseExpedicao_id' não pode estar vazio." })
  readonly baseExpedicao_id: string;

  @IsString({ message: "O campo 'user_id' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'user_id' não pode estar vazio." })
  readonly user_id: string;

  conference_user?: string;

  updated_at?: string;
}
