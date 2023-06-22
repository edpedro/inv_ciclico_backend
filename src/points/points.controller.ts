import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { PointsService } from './points.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('points')
@UseGuards(AuthGuard('jwt'))
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get()
  findOne(@Req() req: any) {
    return this.pointsService.findPointsOne(req);
  }
  @Get('users')
  findAllUsers(@Req() req: any) {
    return this.pointsService.findPointsAllUsers(req);
  }
}
