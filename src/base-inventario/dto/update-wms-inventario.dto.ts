import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseInventarioDto } from './create-base-inventario.dto';

export class UpdateWmsInventarioDto extends PartialType(
  CreateBaseInventarioDto,
) {
  readonly id: number;
  readonly saldoWms: number;
}
