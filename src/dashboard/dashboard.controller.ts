import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.dashboardService.findIdInve(id);
  }
}
