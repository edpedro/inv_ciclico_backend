import {
  Process,
  Processor,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
} from '@nestjs/bull';
import { Job } from 'bull';
import { BaseSerialService } from '../service/base-serial.service';

@Processor('baseSerialQueue')
export class BaseSerialProcessor {
  constructor(private readonly baseSerialService: BaseSerialService) {}

  @Process('upload')
  async handleUpload(job: Job) {
    const { file, userId } = job.data;

    try {
      await this.baseSerialService.processUpload(file, userId, job);
      await job.moveToCompleted('done', true);
    } catch (error) {
      await job.moveToFailed({ message: error.message });
      throw error;
    }
  }

  @Process('delete')
  async handleDelete(job: Job) {
    const { userId } = job.data;

    try {
      await this.baseSerialService.processDeleteAll(userId, job);
      await job.moveToCompleted('done', true);
    } catch (error) {
      await job.moveToFailed({ message: error.message });
    }
  }

  @Process('deleteCodigo')
  async handleDeleteCodigo(job: Job) {
    const { userId, codigo } = job.data;

    try {
      await this.baseSerialService.processDeleteCodigo(userId, codigo, job);
      await job.moveToCompleted('done', true);
    } catch (error) {
      await job.moveToFailed({ message: error.message });
    }
  }

  @OnQueueActive()
  onActive(job: Job<any>) {
    console.log(`Ativo`, job.id);
  }

  @OnQueueFailed()
  async onQueueFailed(job: Job<any>, err: Error) {
    console.log(`Falha`, job.id, err);
  }

  @OnQueueCompleted()
  async onQueueCompleted(job: Job<any>) {
    console.log(`Completo`, job.id);
  }
}
