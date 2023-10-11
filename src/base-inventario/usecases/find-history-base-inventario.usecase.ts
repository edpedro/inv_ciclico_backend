import { Injectable } from '@nestjs/common';
import { BaseInventarioRepository } from '../repositories/base-inventario.repository';
import { ListItemHistoricoDto } from '../dto/list-historico.item.dto';

@Injectable()
export class HistoryBaseInventarioUseCase {
  constructor(
    private readonly baseInventarioRepository: BaseInventarioRepository,
  ) {}

  async execute(data: ListItemHistoricoDto) {
    return this.baseInventarioRepository.historyItem(data);
  }
}
