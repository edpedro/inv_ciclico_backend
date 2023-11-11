import { IsString, IsNotEmpty } from 'class-validator';

export class AlocateEnderecoUser {
  @IsString({
    each: true,
    message: 'Cada elemento da lista deve ser uma string.',
  })
  @IsNotEmpty({ message: "O campo 'Endereco' não pode estar vazio." })
  readonly endereco: string[];

  @IsString({ message: "O campo 'User_id' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'User_id' não pode estar vazio." })
  readonly username_id: string;
}
