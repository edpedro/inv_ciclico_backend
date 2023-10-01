import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateNameInventarioDto {
  @IsString({ message: "O campo 'Nome' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Nome' não pode estar vazio." })
  readonly name: string;

  @IsString({ message: "O campo 'Data' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Data' não pode estar vazio." })
  readonly date: string;

  @IsOptional()
  @IsString({
    each: true,
    message: 'Cada elemento da lista deve ser uma string.',
  })
  readonly user_id?: string[];

  @IsOptional()
  @IsBoolean({ message: "O campo 'Staus' deve ser uma boolean." })
  readonly status?: boolean;
}
