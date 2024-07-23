import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseProtocolsDto } from 'src/utils/baseProtocol/CreateProtocolDto';

@Injectable()
export class BaseProtocolRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBaseProtocol(newData: BaseProtocolsDto) {
    return await this.prisma.protocols.createMany({
      data: newData.protocols,
    });
  }
  async findAllIdNameProtocol(id: string) {
    return await this.prisma.protocols.findMany({
      where: {
        nameProtocols_id: id,
      },
      include: {
        nameProtocols: {
          select: {
            id: true,
            name: true,
            date: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }
  async findOneSerialProtocol(serialProt: string) {
    return await this.prisma.protocols.findFirst({
      where: {
        serial: {
          equals: serialProt,
        },
      },
      include: {
        nameProtocols: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async deleteSerialProtocol(id: number) {
    return await this.prisma.protocols.delete({
      where: {
        id,
      },
    });
  }
}
