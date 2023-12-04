import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvReaderModule } from './csv-reader/csv-reader.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), CsvReaderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
