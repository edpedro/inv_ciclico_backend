import { ExportFileRepository } from './../repositories/export-file.repository';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ListBaseProcotolUseCase {
  constructor(private readonly exportFileRepository: ExportFileRepository) {}

  async execute(id: string) {
    // return this.exportFileRepository.findAProtocol(id);
  }
}
