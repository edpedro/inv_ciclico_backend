import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseExpedicaoDto } from './create-base-expedicao.dto';

export class UpdateBaseExpedicaoDto extends PartialType(CreateBaseExpedicaoDto) {}
