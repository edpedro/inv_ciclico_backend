import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Parser } from 'json2csv';
import { appendFileSync } from 'fs';

@Injectable()
export class BackupService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const chunkSize = 1000; // Defina o tamanho do chunk de acordo com sua necessidade
    let skip = 0;

    while (true) {
      const data = await this.prisma.baseInventario.findMany({
        skip: skip,
        take: chunkSize,
      });

      if (data.length === 0) {
        break;
      }

      const fields = [
        'id',
        'item',
        'descricao',
        'endereco',
        'tipoEstoque',
        'catItem',
        'saldoWms',
        'price',
        'firstCount',
        'secondCount',
        'firstStatus',
        'secondStatus',
        'created_at',
        'updated_at',
        'username_id',
        'baseNameInventario_id',
      ];

      const opts = {
        fields,
        transforms: [
          (value) => {
            if (value === null || value === undefined) {
              return '';
            } else if (typeof value === 'string') {
              return `"${value}"`;
            } else if (typeof value === 'number') {
              return value.toFixed(2);
            } else if (typeof value === 'boolean') {
              return value ? 'TRUE' : 'FALSE';
            } else if (value instanceof Date) {
              return value.toISOString();
            } else {
              return value;
            }
          },
        ],
      };

      try {
        const parser = new Parser(opts);
        const csv = parser.parse(data);
        appendFileSync('baseInventario.csv', csv);
        console.log(
          `Backup de ${skip} a ${skip + chunkSize} criado com sucesso!`,
        );
      } catch (err) {
        console.error(err);
      }

      skip += chunkSize;
    }
  }
  async findAllUser() {
    const data = await this.prisma.user.findMany({});

    const fields = [
      'id',
      'name',
      'username',
      'password',
      'role',
      'active',
      'created_at',
      'updated_at',
      'createdById',
    ];

    const opts = {
      fields,
      transforms: [
        (value) => {
          if (value === null || value === undefined) {
            return '""'; // Retorna aspas duplas
          } else if (typeof value === 'string') {
            return `"${value}"`;
          } else if (typeof value === 'number') {
            return value.toFixed(2);
          } else if (typeof value === 'boolean') {
            return value ? 'TRUE' : 'FALSE';
          } else if (value instanceof Date) {
            return value.toISOString();
          } else {
            return value;
          }
        },
      ],
    };

    try {
      const parser = new Parser(opts);
      const csv = parser.parse(data);
      appendFileSync('user.csv', csv);
      console.log(`Backup de criado com sucesso!`);
    } catch (err) {
      console.error(err);
    }
  }
  async findAllUserNameInventario() {
    const data = await this.prisma.nameInventarioOnUsers.findMany({});

    const fields = ['user_id', 'nameInventario_id', 'assignedAt', 'assignedBy'];

    const opts = {
      fields,
      transforms: [
        (value) => {
          if (value === null || value === undefined) {
            return '';
          } else if (typeof value === 'string') {
            return `"${value}"`;
          } else if (typeof value === 'number') {
            return value.toFixed(2);
          } else if (typeof value === 'boolean') {
            return value ? 'TRUE' : 'FALSE';
          } else if (value instanceof Date) {
            return value.toISOString();
          } else {
            return value;
          }
        },
      ],
    };

    try {
      const parser = new Parser(opts);
      const csv = parser.parse(data);
      appendFileSync('nameInventarioOnUsers.csv', csv);
      console.log(`Backup de criado com sucesso!`);
    } catch (err) {
      console.error(err);
    }
  }
}
