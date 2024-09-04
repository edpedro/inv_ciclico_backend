import { Injectable, Logger } from '@nestjs/common';
import {
  Process,
  Processor,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { BaseSerialService } from '../service/base-serial.service';
import { createExcelBaseSerial } from 'src/utils/baseSerial/createExcelBaseSerial';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ListUserOneUseCase } from 'src/users/usecases/list-user-one.usecase';
import { CreateBaseSerialUseCase } from '../usecases/create-base-serial.usecase';
import { PrismaClient, Prisma } from '@prisma/client';

import Redis from 'ioredis';

@Processor('baseSerialQueue')
export class BaseSerialProcessor {
  private processingJobId: string | null = null;

  constructor(
    private readonly baseSerialService: BaseSerialService,
    private readonly listUserOneUseCase: ListUserOneUseCase,
    private readonly createBaseSerialUseCase: CreateBaseSerialUseCase,
    @InjectQueue('baseSerialQueue') private baseSerialQueue: Queue,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  @Process('upload')
  async handleUpload(job: Job) {
    // if (this.processingJobId && this.processingJobId !== job.id.toString()) {
    //   // Se há um job em processamento e não é o job atual, adicione o job atual de volta à fila
    //   await this.baseSerialQueue.add('upload', job.data, {
    //     delay: 1000, // Aguarde 1 segundo antes de tentar novamente
    //     jobId: job.id, // Manter o mesmo ID de job
    //   });
    //   console.log(`Job ${job.id} adicionado de volta à fila`);
    //   return;
    // }

    // this.processingJobId = job.id.toString(); // Marque o job atual como em processamento

    // try {
    //   const { file, userId } = job.data;
    //   const userExist = await this.listUserOneUseCase.execute(userId);
    //   const cacheKey = `codigo_${userId}`;

    //   if (!userExist) {
    //     throw new HttpException(
    //       'Usuário não encontrado',
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   }

    //   await this.redisClient.del(cacheKey);

    //   const data = await createExcelBaseSerial(file, userId);
    //   const chunkSize = 10000;
    //   const totalChunks = Math.ceil(data.length / chunkSize);

    //   let totalProcessed = 0;

    //   for (let i = 0; i < totalChunks; i++) {
    //     const start = i * chunkSize;
    //     const end = start + chunkSize;
    //     const chunk = data.slice(start, end);

    //     await this.createBaseSerialUseCase.execute(chunk);

    //     totalProcessed += chunk.length;
    //     const progress = Math.min((totalProcessed / data.length) * 100, 100);
    //     console.log(`Progresso do job ${job.id}: ${progress.toFixed()}%`);
    //     await job.progress(progress);
    //   }

    //   console.log(`Job ${job.id} finalizado com sucesso.`);
    //   if (job.isActive()) {
    //     await job.moveToCompleted('done', true);
    //   }
    // } catch (error) {
    //   console.error(`Erro durante o processamento do job ${job.id}:`, error);
    //   if (job.isActive()) {
    //     await job.moveToFailed({ message: error.message });
    //   }
    // } finally {
    //   this.processingJobId = null; // Marque como concluído
    //   // Verifique se há outros jobs na fila para processar
    //   await this.processNextJob();
    // }

    try {
      const { file, userId } = job.data;

      await this.baseSerialService.processUpload(file, userId, job);
      await job.moveToCompleted('done', true);
    } catch (error) {
      await job.moveToFailed({ message: error.message });
      throw error;
    }
  }

  private async processNextJob() {
    if (!this.processingJobId) {
      // Somente processar o próximo job se não há um job em processamento
      const nextJob = await this.baseSerialQueue.getJob('upload');
      if (nextJob) {
        this.processingJobId = nextJob.id.toString(); // Atualize o ID do job em processamento
        await this.handleUpload(nextJob);
      }
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

// try {
//   await this.baseSerialService.processUpload(file, userId, job);
//   await job.moveToCompleted('done', true);
// } catch (error) {
//   await job.moveToFailed({ message: error.message });
//   throw error;
// }
