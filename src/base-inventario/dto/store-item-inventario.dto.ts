import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class StoreItemInventarioDto {
  @IsString({ message: "O campo 'Item' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Item' não pode estar vazio." })
  readonly item: string;

  @IsNumber()
  readonly endereco: number;

  @IsNumber()
  readonly firstCount: number;
}
