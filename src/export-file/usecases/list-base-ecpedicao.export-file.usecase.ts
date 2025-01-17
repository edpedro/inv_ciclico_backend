import { ExportFileRepository } from '../repositories/export-file.repository';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ListBaseExpedicaoUseCase {
  constructor(private readonly exportFileRepository: ExportFileRepository) {}

  async execute(id: string) {
    return this.exportFileRepository.findExpedicaoId(id);
  }
}
