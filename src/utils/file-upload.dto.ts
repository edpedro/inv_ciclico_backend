import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';

export class UploadDto {
  readonly fieldname: string;
  readonly originalname: string;
  readonly encoding: string;
  readonly mimetype: string;
  readonly buffer: Buffer;
  readonly size: number;
  readonly baseNameInventario_id: string;
}

export const multerOptions: MulterOptions = {
  storage: memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
};

export const multerOptionsPDF: MulterOptions = {
  storage: memoryStorage(),
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'application/pdf') {
      return callback(new BadRequestException('Apenas arquvios PDF'), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
};

export class UploadPDFDto {
  readonly fieldname: string;
  readonly originalname: string;
  readonly encoding: string;
  readonly mimetype: string;
  readonly buffer: Buffer;
  readonly size: number;
  readonly baseExpedicao_id: string;
}
