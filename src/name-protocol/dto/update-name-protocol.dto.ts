import { PartialType } from '@nestjs/mapped-types';
import { CreateNameProtocolDto } from './create-name-protocol.dto';

export class UpdateNameProtocolDto extends PartialType(CreateNameProtocolDto) {}
