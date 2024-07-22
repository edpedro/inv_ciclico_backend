import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseProtocolDto } from './create-base-protocol.dto';

export class UpdateBaseProtocolDto extends PartialType(CreateBaseProtocolDto) {}
