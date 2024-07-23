import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBaseSerialDto {
  @IsString({ message: "O campo 'Codigo' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Codigo' não pode estar vazio." })
  readonly codigo: string;

  @IsString({ message: "O campo 'Serial' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Serial' não pode estar vazio." })
  readonly serial: string;

  @IsString({ message: "O campo 'Centro' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Centro' não pode estar vazio." })
  readonly center?: string;

  @IsString({ message: "O campo 'Deposito' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Deposito' não pode estar vazio." })
  readonly deposit?: string;

  @IsString({ message: "O campo 'Status' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Status' não pode estar vazio." })
  readonly status?: string;

  @IsString({ message: "O campo 'User_id' deve ser uma string." })
  readonly user_id: string;
}
