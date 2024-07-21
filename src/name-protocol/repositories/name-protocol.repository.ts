import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNameProtocolDto } from '../dto/create-name-protocol.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { ListNameProtocolDto } from '../dto/list-name-protocol.dto';
import { UpdateNameProtocolDto } from '../dto/update-name-protocol.dto';

@Injectable()
export class NameProtocolRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createNameProtocol(data: CreateNameProtocolDto, req: ReqUserDto) {
    return await this.prisma.nameProtocols.create({
      data: {
        name: data.name,
        date: data.date,
        user_id: req.user.id,
      },
    });
  }

  async findOneProtocolName(name: string): Promise<ListNameProtocolDto> {
    return await this.prisma.nameProtocols.findFirst({
      where: {
        name,
      },
      include: {
        user: true,
      },
    });
  }

  async findAllProtocolName(req: ReqUserDto): Promise<ListNameProtocolDto[]> {
    return await this.prisma.nameProtocols.findMany({
      where: {
        user_id: req.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            role: true,
            active: true,
          },
        },
      },
    });
  }

  async deleteProtocolName(id: string): Promise<ListNameProtocolDto> {
    return await this.prisma.nameProtocols.delete({
      where: {
        id,
      },
    });
  }

  async findIdProtocolName(id: string): Promise<ListNameProtocolDto> {
    return await this.prisma.nameProtocols.findFirst({
      where: {
        id,
      },
    });
  }

  async updateProtocolName(
    id: string,
    newDate: UpdateNameProtocolDto,
  ): Promise<ListNameProtocolDto> {
    return await this.prisma.nameProtocols.update({
      where: {
        id,
      },
      data: {
        ...newDate,
      },
    });
  }
}
