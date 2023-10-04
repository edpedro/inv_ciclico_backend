import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateBaseInventarioDto {
  @IsString({ message: "O campo 'Item' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Item' não pode estar vazio." })
  readonly item: string;

  @IsString({ message: "O campo 'Descrição' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Descrição' não pode estar vazio." })
  readonly descricao: string;

  @IsString({ message: "O campo 'Endereço' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Endereço' não pode estar vazio." })
  readonly endereco: string;

  @IsString({ message: "O campo 'Tipo Estoque' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Tipo Estoque' não pode estar vazio." })
  readonly tipoEstoque: string;

  @IsString({ message: "O campo 'Categoria' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Categoria' não pode estar vazio." })
  readonly catItem: string;

  @IsNumber()
  @IsNotEmpty({ message: "O campo 'Saldo WMS' não pode estar vazio." })
  readonly saldoWms: number;

  @IsNumber()
  @IsOptional()
  readonly saldoFisico?: number;

  @IsOptional()
  @IsBoolean({ message: "O campo 'Staus' deve ser uma boolean." })
  readonly status?: boolean;

  @IsString({ message: "O campo 'Inventario_id' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Inventario_id' não pode estar vazio." })
  readonly baseNameInventario_id: string;

  @IsOptional()
  @IsString({ message: "O campo 'User_id' deve ser uma string." })
  readonly username_id?: string;
}
