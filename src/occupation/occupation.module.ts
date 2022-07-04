import { PrismaService } from './../_prisma/_prisma.service';
import { Module } from '@nestjs/common';
import { OccupationService } from './occupation.service';
import { OccupationController } from './occupation.controller';

@Module({
  controllers: [OccupationController],
  providers: [OccupationService, PrismaService],
})
export class OccupationModule {}
