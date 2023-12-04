import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { ClientProxy } from '@nestjs/microservices';
import 'dotenv/config';

@Injectable()
export class CsvReaderService implements OnModuleInit {
  private readonly logger = new Logger(CsvReaderService.name);
  private csvFilePath = './assets/sensor.csv';
  private rowData: any[] = [];

  constructor(
    @Inject('Monitoring_MICROSERVICE')
    private readonly clientMonitoring: ClientProxy,
  ) {}

  onModuleInit(): any {
    this.readCsv();
  }

  private readCsv(): void {
    const csvStream = fs.createReadStream(this.csvFilePath).pipe(csv());

    csvStream.on('data', (row) => {
      this.rowData.push(row[0]);
    });

    csvStream.on('end', () => {
      this.rowData.forEach((row, index) => {
        setTimeout(async () => {
          this.logger.log(`Read row ${index}: ${row}`);

          this.clientMonitoring.emit(
            { cmd: 'monitoring' },
            {
              timestamp: new Date().getTime(),
              device_id: process.env.DEVICE_ID,
              measurement_value: row,
            },
          );
        }, index * 10000); // Log each row every 1 seconds
      });
    });
  }
}
