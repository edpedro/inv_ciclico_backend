import { ListAllCodigoBaseSerialUseCase } from './../usecases/list-codigo-base-serial.usecase ';
import { ListAllCountBaseSerialUseCase } from './../usecases/list-all-base-serial.usecase';
import { RemoveBaseSerialUseCase } from './../usecases/romove-base-serial.usecase';
import { ListSerialProtocolUseCase } from './../../base-protocol/usecases/list-serial-baseProtocol.usecase';
import { ListSerialBaseSerialUseCase } from './../usecases/list-serial-base-serial.usecase';
import { CreateBaseSerialUseCase } from './../usecases/create-base-serial.usecase';
import { ListUserOneUseCase } from './../../users/usecases/list-user-one.usecase';
import { CreateStatusJobUserUseCase } from '../usecases/create-statusJob-serial.usecase';
import { ListAllStatusJobsUserCase } from '../usecases/list-all-statusJobs-serial.usecase';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { createExcelBaseSerial } from 'src/utils/baseSerial/createExcelBaseSerial';
import { UploadDto } from 'src/utils/file-upload.dto';
import { ListSerialDto } from '../dto/list-serial-serial.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateStatusJobDto } from '../dto/create-statusJob-serial.dto';
import { StatusJobDto } from '../dto/status-base-serial.dto';
import { RemoveCodigoBaseSerialUseCase } from '../usecases/romove-codigo-base-serial.usecase';
import Redis from 'ioredis';

@Injectable()
export class BaseSerialService {
  constructor(
    private readonly listUserOneUseCase: ListUserOneUseCase,
    private readonly createBaseSerialUseCase: CreateBaseSerialUseCase,
    private readonly listSerialBaseSerialUseCase: ListSerialBaseSerialUseCase,
    private readonly listSerialProtocolUseCase: ListSerialProtocolUseCase,
    private readonly removeBaseSerialUseCase: RemoveBaseSerialUseCase,
    private readonly listAllCountBaseSerialUseCase: ListAllCountBaseSerialUseCase,
    private readonly createStatusJobUserUseCase: CreateStatusJobUserUseCase,
    private readonly listAllStatusJobsUserCase: ListAllStatusJobsUserCase,
    private readonly listAllCodigoBaseSerialUseCase: ListAllCodigoBaseSerialUseCase,
    private readonly removeCodigoBaseSerialUseCase: RemoveCodigoBaseSerialUseCase,
    @InjectQueue('baseSerialQueue') private baseSerialQueue: Queue,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async create(file: UploadDto, userId: string) {
    const job = await this.baseSerialQueue.add(
      'upload',
      { file, userId },
      {
        attempts: 5,
        backoff: {
          type: 'fixed',
          delay: 1000,
        },
        removeOnFail: false,
        removeOnComplete: false,
      },
    );

    if (job.id) {
      const resultStatus = new CreateStatusJobDto();

      resultStatus.jobN = String(job.id);
      resultStatus.user_id = userId;

      await this.createStatusJobUserUseCase.execute(resultStatus);
    }

    return {
      message: 'Upload iniciado',
      jobId: job.id,
      name: file.originalname,
    };
  }

  async removeAll(userId: string) {
    const job = await this.baseSerialQueue.add(
      'delete',
      { userId },
      {
        attempts: 5,
        backoff: {
          type: 'fixed',
          delay: 10000,
        },
        removeOnFail: false,
        removeOnComplete: false,
      },
    );

    if (job.id) {
      const resultStatus = new CreateStatusJobDto();

      resultStatus.jobN = String(job.id);
      resultStatus.user_id = userId;

      await this.createStatusJobUserUseCase.execute(resultStatus);
    }

    return {
      message: 'Apagar todos os dados iniciado',
      jobId: job.id,
    };
  }

  async removeCodigo(userId: string, codigo: string) {
    const job = await this.baseSerialQueue.add(
      'deleteCodigo',
      { userId, codigo },
      {
        attempts: 5,
        backoff: {
          type: 'fixed',
          delay: 10000,
        },
        removeOnFail: false,
        removeOnComplete: false,
      },
    );

    if (job.id) {
      const resultStatus = new CreateStatusJobDto();

      resultStatus.jobN = String(job.id);
      resultStatus.user_id = userId;

      await this.createStatusJobUserUseCase.execute(resultStatus);
    }

    return {
      message: `O codigo ${codigo} está sendo apagando`,
      jobId: job.id,
      codigo: codigo,
    };
  }

  async processUpload(file: UploadDto, userId: string, job: any) {
    const userExist = await this.listUserOneUseCase.execute(userId);

    const cacheKey = `codigo_${userId}`;

    if (!userExist) {
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);
    }

    await this.redisClient.del(cacheKey);

    try {
      const data = await createExcelBaseSerial(file, userId);
      const chunkSize = 10000;
      const totalChunks = Math.ceil(data.length / chunkSize);

      let totalProcessed = 0;

      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;

        const end = start + chunkSize;
        const chunk = data.slice(start, end);
        const formattedChunk = chunk.map((item) => ({
          ...item,
        }));

        await this.createBaseSerialUseCase.execute(formattedChunk);

        totalProcessed += formattedChunk.length;

        const progress = Math.min((totalProcessed / data.length) * 100, 100);
        console.log(
          `Progresso do job ${job.id}: ${progress.toFixed()}% : ${
            file.originalname
          }`,
        );
        await job.progress(progress);

        chunk.length = 0;
        formattedChunk.length = 0;
      }

      await job.moveToCompleted('done', true);
    } catch (error) {
      console.error('Erro durante o processamento do job:', error);
      await job.moveToFailed({ message: error.message });
      throw error;
    }
  }

  async getJobStatus(jobId: string): Promise<StatusJobDto> {
    const job = await this.baseSerialQueue.getJob(jobId);
    if (!job) {
      throw new HttpException('Job não encontrado', HttpStatus.NOT_FOUND);
    }
    const statusInEnglish = await job.getState();

    const statusMap = {
      waiting: 'esperando',
      active: 'ativo',
      completed: 'concluído',
      failed: 'falha',
      delayed: 'adiado',
      paused: 'pausado',
    };

    const statusInPortuguese = statusMap[statusInEnglish] || statusInEnglish;

    return {
      id: String(job.id),
      status: statusInPortuguese,
      progress: job.progress(),
      result: job.returnvalue,
      failedReason: job.failedReason,
    };
  }
  async getAllJobsByStatus(status: string): Promise<any[]> {
    let jobs: any[] = [];
    switch (status) {
      case 'esperando':
        jobs = await this.baseSerialQueue.getWaiting();
        break;
      case 'ativo':
        jobs = await this.baseSerialQueue.getActive();
        break;
      case 'concluído':
        jobs = await this.baseSerialQueue.getCompleted();
        break;
      case 'falha':
        jobs = await this.baseSerialQueue.getFailed();
        break;
      case 'adiado':
        jobs = await this.baseSerialQueue.getDelayed();
        break;
      default:
        throw new HttpException('status invalido', HttpStatus.BAD_REQUEST);
    }

    return jobs.map((job) => ({
      id: job.id,
      status,
      progress: job.progress(),
      result: job.returnvalue,
      failedReason: job.failedReason,
    }));
  }

  async getAllJobStatuses(): Promise<any> {
    const waitingJobs = await this.getAllJobsByStatus('esperando');
    const activeJobs = await this.getAllJobsByStatus('ativo');
    const completedJobs = await this.getAllJobsByStatus('concluído');
    const failedJobs = await this.getAllJobsByStatus('falha');
    const delayedJobs = await this.getAllJobsByStatus('adiado');

    return {
      waiting: waitingJobs,
      active: activeJobs,
      completed: completedJobs,
      failed: failedJobs,
      delayed: delayedJobs,
    };
  }

  async findAllStatusJobsUser(req: ReqUserDto) {
    const statusUser: any[] = [];
    const data = await this.listAllStatusJobsUserCase.execute(req);

    await Promise.all(
      data.map(async (item) => {
        const result = await this.getJobStatus(item.jobN);

        statusUser.push({
          id: item.id,
          job: item.jobN,
          status: result.status,
          progresso: result.progress,
          user: item.user.name,
        });
      }),
    );
    statusUser.sort((a, b) => b.job.localeCompare(a.job));

    return statusUser;
  }

  async findAllCount(req: ReqUserDto) {
    const data = await this.listAllCountBaseSerialUseCase.execute(req.user.id);

    return data;
  }

  async findAllCodigo(req: ReqUserDto) {
    const CACHE_EXPIRATION = 2592000;
    const cacheKey = `codigo_${req.user.id}`;
    const cachedData = await this.redisClient.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await this.listAllCodigoBaseSerialUseCase.execute(req.user.id);

    await this.redisClient.set(
      cacheKey,
      JSON.stringify(data),
      'EX',
      CACHE_EXPIRATION,
    );

    return data;
  }

  async findAll(serial: string) {
    let serialBaseProtocol: ListSerialDto = null;
    //Buscar primeiro se consta no protocolo
    const resultProtocol = await this.listSerialProtocolUseCase.execute(serial);

    if (resultProtocol) {
      serialBaseProtocol = {
        serial: resultProtocol.serial,
        id: resultProtocol.id,
        codigo: resultProtocol.codigo,
        caixa: resultProtocol.caixa,
        nameProtocols: resultProtocol.nameProtocols.name,
      };
      return serialBaseProtocol;
    } else {
      let serialBaseSerial: ListSerialDto = null;
      //depois busca na base serial
      const result = await this.listSerialBaseSerialUseCase.execute(serial);

      let filterSerial =
        result.find((item) => item.center === 'V161') ||
        result.find((item) => item.center === 'X161') ||
        (result.length > 0 ? result[0] : null);

      if (filterSerial) {
        serialBaseSerial = {
          serial: filterSerial.serial,
          id: filterSerial.id,
          codigo: filterSerial.codigo,
          deposit: filterSerial.deposit,
          center: filterSerial.center,
        };
      }

      return serialBaseSerial;
    }
  }

  async processDeleteAll(userId: string, job: any) {
    const cacheKey = `codigo_${userId}`;
    const userExist = await this.listUserOneUseCase.execute(userId);

    if (!userExist) {
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.removeBaseSerialUseCase.execute(userId);
      await this.redisClient.del(cacheKey);

      await job.progress(100);

      return `Usuario #${userId} deletado da baseSerial`;
    } catch (error) {
      throw new HttpException('Dados não deletados', HttpStatus.BAD_REQUEST);
    }
  }

  async processDeleteCodigo(userId: string, codigo: string, job: any) {
    const cacheKey = `codigo_${userId}`;
    const userExist = await this.listUserOneUseCase.execute(userId);

    if (!userExist) {
      throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.removeCodigoBaseSerialUseCase.execute(codigo);
      await this.redisClient.del(cacheKey);

      await job.progress(100);

      return `Usuario #${userId} deletado da baseSerial`;
    } catch (error) {
      throw new HttpException('Dados não deletados', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteAllJobs() {
    try {
      console.log('Pausando a fila...');
      await this.baseSerialQueue.pause();

      console.log('Limpando jobs completados...');
      await this.baseSerialQueue.clean(0, 'completed');

      console.log('Limpando jobs falhados...');
      await this.baseSerialQueue.clean(0, 'failed');

      console.log('Limpando jobs atrasados...');
      await this.baseSerialQueue.clean(0, 'delayed');

      console.log('Limpando jobs ativos...');
      await this.baseSerialQueue.clean(0, 'active');

      console.log('Limpando jobs pausados...');
      await this.baseSerialQueue.clean(0, 'paused');

      // Verifica e remove manualmente jobs restantes
      console.log('Verificando e removendo manualmente jobs restantes...');
      const jobs = await this.baseSerialQueue.getJobs([
        'waiting',
        'active',
        'paused',
        'delayed',
      ]);
      for (const job of jobs) {
        try {
          console.log(`Tentando remover job ${job.id}...`);
          await job.remove();
          console.log(`Job ${job.id} removido com sucesso.`);
        } catch (err) {
          console.error(`Erro ao tentar remover o job ${job.id}:`, err);

          // Tenta remover o job diretamente do Redis
          try {
            const jobKey = `bull:${this.baseSerialQueue.name}:${job.id}`;
            console.log(
              `Tentando remover diretamente do Redis a chave ${jobKey}`,
            );
            await this.baseSerialQueue.client.del(jobKey);
            console.log(`Chave ${jobKey} removida do Redis.`);
          } catch (redisErr) {
            console.error(
              `Erro ao tentar remover diretamente do Redis a chave:`,
              redisErr,
            );
          }
        }
      }

      // Limpar dados diretamente no Redis
      console.log('Limpando dados diretamente no Redis...');
      const keys = await this.baseSerialQueue.client.keys(
        `bull:${this.baseSerialQueue.name}:*`,
      );
      for (const key of keys) {
        await this.baseSerialQueue.client.del(key);
        console.log(`Chave ${key} removida do Redis.`);
      }

      console.log('Esvaziando a fila...');
      await this.baseSerialQueue.empty();

      console.log('Retomando a fila...');
      await this.baseSerialQueue.resume();

      return { message: 'Todos os jobs foram limpos com sucesso.' };
    } catch (error) {
      console.error('Erro ao tentar limpar os jobs:', error);
      throw new HttpException(
        'Erro ao tentar limpar os jobs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // async deleteAllJobs() {
  //   try {
  //     console.log('Pausando a fila...');
  //     await this.baseSerialQueue.pause();

  //     console.log('Limpando jobs completados...');
  //     await this.baseSerialQueue.clean(0, 'completed');

  //     console.log('Limpando jobs falhados...');
  //     await this.baseSerialQueue.clean(0, 'failed');

  //     console.log('Limpando jobs atrasados...');
  //     await this.baseSerialQueue.clean(0, 'delayed');

  //     console.log('Limpando jobs ativos...');
  //     await this.baseSerialQueue.clean(0, 'active');

  //     console.log('Limpando jobs pausados...');
  //     await this.baseSerialQueue.clean(0, 'paused');

  //     // Verifica e remove manualmente jobs restantes
  //     console.log('Verificando e removendo manualmente jobs restantes...');
  //     const jobs = await this.baseSerialQueue.getJobs([
  //       'waiting',
  //       'active',
  //       'paused',
  //       'delayed',
  //     ]);
  //     for (const job of jobs) {
  //       try {
  //         console.log(`Removendo job ${job.id}...`);
  //         await job.remove();
  //         console.log(`Job ${job.id} removido com sucesso.`);
  //       } catch (err) {
  //         console.error(`Erro ao remover jo ${job.id}:`, err);

  //         // Tenta remover o job diretamente do Redis
  //         try {
  //           const jobKey = `bull:${this.baseSerialQueue.name}:${job.id}`;
  //           console.log(
  //             `Tentando remover diretamente do Redis a chave ${jobKey}`,
  //           );
  //           await this.baseSerialQueue.client.del(jobKey);
  //           console.log(`Chave ${jobKey} removida do Redis.`);
  //         } catch (redisErr) {
  //           console.error(
  //             `Erro ao remover diretamente do Redis a chave `,
  //             redisErr,
  //           );
  //         }
  //       }
  //     }

  //     console.log('Esvaziando a fila...');
  //     await this.baseSerialQueue.empty();

  //     console.log('Retomando a fila...');
  //     await this.baseSerialQueue.resume();

  //     return { message: 'Todos os jobs foram limpos com sucesso.' };
  //   } catch (error) {
  //     console.error('Erro ao tentar limpar os jobs:', error);
  //     throw new HttpException(
  //       'Erro ao tentar limpar os jobs',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
