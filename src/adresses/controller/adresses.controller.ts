import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdressesService } from '../service/adresses.service';
import { AuthGuard } from '@nestjs/passport';
import { multerOptions } from 'src/utils/file-upload.dto';
import { UploadAdressDto } from '../dto/file-upload.adress.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Controller('adresses')
@UseGuards(AuthGuard('jwt'))
export class AdressesController {
  constructor(private readonly adressesService: AdressesService) {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async updalodCsv(
    @UploadedFile() file: UploadAdressDto,
    @Body() data: UploadAdressDto,
    @Req() req: ReqUserDto,
  ) {
    return await this.adressesService.uploadAdress(file, data, req);
  }

  @Get()
  async findAllAdress(@Req() req: ReqUserDto) {
    return await this.adressesService.findAllAdress(req);
  }

  @Delete(':id')
  async deleteAllAdress(@Param('id') id: string) {
    return await this.adressesService.deleteAllAdress(id);
  }
}
