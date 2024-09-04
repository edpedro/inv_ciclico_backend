import {
  Controller,
  Get,
  Post,
  Query,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseSerialService } from '../service/base-serial.service';
import { UploadDto, multerOptions } from 'src/utils/file-upload.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Controller('baseserial')
@UseGuards(AuthGuard('jwt'))
export class BaseSerialController {
  constructor(private readonly baseSerialService: BaseSerialService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(@UploadedFile() file: UploadDto, @Req() req: ReqUserDto) {
    const { jobId, message, name } = await this.baseSerialService.create(
      file,
      req.user.id,
    );
    return { jobId, message, name };
  }

  @Get('status/:id')
  async getStatus(@Param('id') jobId: string) {
    const jobStatus = await this.baseSerialService.getJobStatus(jobId);
    return jobStatus;
  }

  @Get('status/jobs')
  async getAllJobStatuses() {
    const jobStatuses = await this.baseSerialService.getAllJobStatuses();
    return jobStatuses;
  }

  @Get('status')
  async getStatusUserJobs(@Req() req: ReqUserDto) {
    const jobStatusUser = await this.baseSerialService.findAllStatusJobsUser(
      req,
    );
    return jobStatusUser;
  }

  @Get('serial')
  findAll(@Query('serial') serial: string) {
    return this.baseSerialService.findAll(serial);
  }

  @Get('/count')
  async findAllCount(@Req() req: ReqUserDto) {
    return await this.baseSerialService.findAllCount(req);
  }

  @Get('/codigo')
  async findAllCodigo(@Req() req: ReqUserDto) {
    return await this.baseSerialService.findAllCodigo(req);
  }

  @Delete()
  async removeAll(@Req() req: ReqUserDto) {
    const { jobId, message } = await this.baseSerialService.removeAll(
      req.user.id,
    );
    return { jobId, message };
  }

  @Delete('/codigo')
  async removeCodigo(@Req() req: ReqUserDto, @Query('codigo') codigo: string) {
    const { jobId, message } = await this.baseSerialService.removeCodigo(
      req.user.id,
      codigo,
    );
    return { jobId, message };
  }
  @Delete('/clear')
  async clearAllJobs() {
    await this.baseSerialService.deleteAllJobs();
  }
}
