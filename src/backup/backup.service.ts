import { Injectable } from '@nestjs/common';
import { CreateBackupDto } from './dto/create-backup.dto';
import { UpdateBackupDto } from './dto/update-backup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { exec } from 'child_process';

@Injectable()
export class BackupService {
  constructor(private readonly prisma: PrismaService) {}

  async createBackupDb() {
    const encodedDatabaseUrl = encodeURI(process.env.DATABASE_URL);
    const command = `pg_dump ${encodedDatabaseUrl} > backup.sql`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
}
