import { PrismaService } from 'src/_prisma/_prisma.service';
import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  controllers: [NewsController],
  providers: [NewsService, PrismaService],
})
export class NewsModule {}
