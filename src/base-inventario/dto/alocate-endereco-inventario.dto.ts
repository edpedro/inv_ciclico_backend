import { IsString, IsNumber, IsArray, ArrayMinSize } from 'class-validator';

export class AlocateEnderecoUserDto {
  @IsString({
    each: true,
    message: 'Cada elemento da lista deve ser uma string.',
  })
  readonly user_ids: string[];

  @IsArray()
  @IsNumber(
    {},
    { each: true, message: 'Cada elemento del array debe ser un número' },
  )
  readonly baseInventario_ids: number[];
}
