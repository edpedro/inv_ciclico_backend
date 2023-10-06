import { PartialType } from '@nestjs/mapped-types';
import { ListExportFileDto } from './list-export-file.dto';

export class UpdateExportFileDto extends PartialType(ListExportFileDto) {}
