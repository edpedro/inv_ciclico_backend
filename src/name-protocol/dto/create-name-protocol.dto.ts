import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNameProtocolDto {
  @IsString({ message: "O campo 'Nome' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Nome' não pode estar vazio." })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: "O campo 'Data' não pode estar vazio." })
  readonly date: string;
}
