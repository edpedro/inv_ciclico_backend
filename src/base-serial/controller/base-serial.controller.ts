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
  create(@UploadedFile() file: UploadDto, @Req() req: ReqUserDto) {
    return this.baseSerialService.create(file, req);
  }

  @Get('serial')
  findAll(@Query('serial') serial: string) {
    return this.baseSerialService.findAll(serial);
  }

  @Delete()
  remove(@Req() req: ReqUserDto) {
    return this.baseSerialService.remove(req);
  }
}
