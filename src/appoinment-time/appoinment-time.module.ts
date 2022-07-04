import { PrismaService } from './../_prisma/_prisma.service';
import { Module } from '@nestjs/common';
import { AppoinmentTimeService } from './appoinment-time.service';
import { AppoinmentTimeController } from './appoinment-time.controller';

@Module({
  controllers: [AppoinmentTimeController],
  providers: [AppoinmentTimeService, PrismaService],
})
export class AppoinmentTimeModule {}
