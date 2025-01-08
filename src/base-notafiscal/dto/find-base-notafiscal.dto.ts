import { IsNotEmpty, IsString } from 'class-validator';

export class FindNumberaseNotafiscalDto {
  @IsString({ message: "O campo 'codigo' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'codigo' não pode estar vazio." })
  readonly number: string;
}
