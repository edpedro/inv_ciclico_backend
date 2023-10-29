import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: "O campo 'Nome' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Nome' não pode estar vazio." })
  readonly name: string;

  @IsString({ message: "O campo 'Usuario' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Usuario' não pode estar vazio." })
  readonly username: string;

  @IsString({ message: "O campo 'Senha' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Senha' não pode estar vazio." })
  readonly password: string;

  @IsString({ message: "O campo 'role' deve ser uma string." })
  @IsOptional()
  readonly role: string;

  @IsOptional()
  readonly active?: boolean;

  @IsString({ message: "O campo 'createdById' deve ser uma string." })
  @IsOptional()
  readonly createdById?: string;
}
