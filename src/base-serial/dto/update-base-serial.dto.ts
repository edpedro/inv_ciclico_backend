import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseSerialDto } from './create-base-serial.dto';

export class UpdateBaseSerialDto extends PartialType(CreateBaseSerialDto) {}
