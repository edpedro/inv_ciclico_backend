import { ReqUserDto } from './../../auth/dto/req-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBaseSerialDto } from '../dto/create-base-serial.dto';
import { CreateStatusJobDto } from '../dto/create-statusJob-serial.dto';

@Injectable()
export class BaseSerialRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBaseSerial(data: CreateBaseSerialDto[]): Promise<any> {
    await this.prisma.baseSerial.createMany({
      data: data,
    });
  }
  async findSerialBaseSerial(serialProt: string) {
    return await this.prisma.baseSerial.findMany({
      where: {
        serial: {
          equals: serialProt,
        },
      },
    });
  }

  async createStatusJob(data: CreateStatusJobDto) {
    return await this.prisma.statusJobs_User.create({
      data,
    });
  }

  async findAllStatusUser(user: ReqUserDto) {
    return await this.prisma.statusJobs_User.findMany({
      where: {
        user_id: user.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  async findChunks(userId: string, chunkSize: number) {
    return await this.prisma.baseSerial.findMany({
      where: {
        user_id: userId,
      },
      take: chunkSize,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  async findAllCodigo(userId: string) {
    const uniqueCodes = await this.prisma.baseSerial.findMany({
      where: {
        user_id: userId,
      },
      distinct: ['codigo'],
      select: {
        codigo: true,
      },
    });
    return uniqueCodes.map((record) => record.codigo);
  }

  async findAllCount(userId: string) {
    return await this.prisma.baseSerial.count({
      where: {
        user_id: userId,
      },
    });
  }

  async removeBaseSerial(userId: string) {
    return await this.prisma.baseSerial.deleteMany({
      where: {
        user_id: userId,
      },
    });
  }

  async removeCodigoBaseSerial(codigo: string) {
    return await this.prisma.baseSerial.deleteMany({
      where: {
        codigo: {
          equals: codigo,
        },
      },
    });
  }
}
