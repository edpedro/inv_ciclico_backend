import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseInventarioDto } from './create-base-inventario.dto';

export class UpdateBaseInventarioDto extends PartialType(
  CreateBaseInventarioDto,
) {
  readonly id: number;
  readonly saldoFisico: number;
  readonly status: boolean;
}
