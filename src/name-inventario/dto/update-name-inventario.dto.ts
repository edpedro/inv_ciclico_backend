import { PartialType } from '@nestjs/mapped-types';
import { CreateNameInventarioDto } from './create-name-inventario.dto';

export class UpdateNameInventarioDto extends PartialType(
  CreateNameInventarioDto,
) {}
