import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateBaseProtocolDto {
  @IsString({ message: "O campo 'nameProtocols_id' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'nameProtocols_id' não pode estar vazio." })
  readonly nameProtocols_id: string;

  @IsString({ message: "O campo 'codigo' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'codigo' não pode estar vazio." })
  readonly codigo: string;

  @IsString({ message: "O campo 'serial' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'serial' não pode estar vazio." })
  readonly serial: string;

  @IsNumber({}, { message: "O campo 'caixa' deve ser um número." })
  @IsNotEmpty({ message: "O campo 'caixa' não pode estar vazio." })
  readonly caixa: number;
}
