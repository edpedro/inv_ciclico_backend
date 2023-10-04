import { Injectable } from '@nestjs/common';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PointsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPointsOne(req: ReqUserDto) {
    return await this.prisma.baseInventario.findMany({
      where: {
        username_id: req.user.id,
      },
    });
  }

  async findPointsBase() {
    return await this.prisma.baseInventario.findMany();
  }
}
