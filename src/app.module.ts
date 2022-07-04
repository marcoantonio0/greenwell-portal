import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './_prisma/_prisma.service';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { OccupationModule } from './occupation/occupation.module';
import { ProjectModule } from './project/project.module';
import { NewsModule } from './news/news.module';
import { AppoinmentTimeModule } from './appoinment-time/appoinment-time.module';

@Module({
  imports: [UserModule, AuthModule, TeamModule, OccupationModule, ProjectModule, NewsModule, AppoinmentTimeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
