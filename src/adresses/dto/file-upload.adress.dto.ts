import { IsNotEmpty, IsString } from 'class-validator';

export class UploadAdressDto {
  readonly fieldname: string;
  readonly originalname: string;
  readonly encoding: string;
  readonly mimetype: string;
  readonly buffer: Buffer;
  readonly size: number;

  @IsString({ message: "O campo 'Nome' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Nome' não pode estar vazio." })
  readonly name: string;
}
