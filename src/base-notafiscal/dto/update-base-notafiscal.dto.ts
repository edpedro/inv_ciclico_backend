import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseNotafiscalDto } from './create-base-notafiscal.dto';

export class UpdateBaseNotafiscalDto extends PartialType(
  CreateBaseNotafiscalDto,
) {}
