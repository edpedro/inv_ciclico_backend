import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAdressDto {
  @IsString({ message: "O campo 'Nome' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Nome' não pode estar vazio." })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty({ message: "O campo 'CodigoEndereço' não pode estar vazio." })
  readonly codeAdress: number;

  @IsString({ message: "O campo 'DescriçãoEndereço' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'DescriçãoEndereço' não pode estar vazio." })
  readonly descriptionAdress: string;

  @IsString({ message: "O campo 'Create_id' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Create_id' não pode estar vazio." })
  readonly create_id: string;

  @IsString({ message: "O campo 'User_id' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'User_id' não pode estar vazio." })
  readonly user_id: string;
}
