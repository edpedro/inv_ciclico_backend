import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBaseSerialDto } from '../dto/create-base-serial.dto';

@Injectable()
export class BaseSerialRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBaseSerial(data: CreateBaseSerialDto[]): Promise<any> {
    const chunkSize = 10000; // Tamanho do bloco
    const promises = [];

    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      promises.push(
        this.prisma.baseSerial.createMany({
          data: chunk,
        }),
      );
    }

    await Promise.all(promises);
    return { message: 'Data inserted successfully' };
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
  async removeBaseSerial(id: string) {
    return await this.prisma.baseSerial.deleteMany({
      where: {
        user_id: id,
      },
    });
  }
}
