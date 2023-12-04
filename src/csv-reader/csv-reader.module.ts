import { Module } from '@nestjs/common';
import { CsvReaderService } from './csv-reader.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Monitoring_MICROSERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'monitoring',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [CsvReaderService],
})
export class CsvReaderModule {}
