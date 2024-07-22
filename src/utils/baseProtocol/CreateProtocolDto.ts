import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBaseProtocolDto } from 'src/base-protocol/dto/create-base-protocol.dto';

export class BaseProtocolsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBaseProtocolDto)
  readonly protocols: CreateBaseProtocolDto[];
}
