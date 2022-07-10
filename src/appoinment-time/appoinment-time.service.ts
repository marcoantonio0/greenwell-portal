import { PrismaService } from './../_prisma/_prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAppoinmentTimeDto } from './dto/create-appoinment-time.dto';
import { UpdateAppoinmentTimeDto } from './dto/update-appoinment-time.dto';
import * as moment from 'moment';
import { parse } from 'path';

@Injectable()
export class AppoinmentTimeService {
  constructor(private prisma: PrismaService) {}

  async appoimentCreate(userId: string) {
    const date = new Date();
    const today = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      date.getDate(),
      0,
      0,
    );

    const todayAppoiments = await this.prisma.appointmentTime.findMany({
      where: {
        userId: parseInt(userId),
        time: {
          gte: today.toISOString(),
          lte: date.toISOString(),
        },
      },
    });
    if (todayAppoiments.length <= 0) {
      return await this.prisma.appointmentTime.create({
        data: {
          type: 'ENTRY',
          userId: parseInt(userId),
        },
      });
    } else {
      return await this.prisma.appointmentTime.create({
        data: {
          type:
            todayAppoiments[todayAppoiments.length - 1].type == 'ENTRY'
              ? 'OUT'
              : 'ENTRY',
          userId: parseInt(userId),
        },
      });
    }
  }

  async getAppoimentsToday(userId: string) {
    const date = new Date();
    const today = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
    );
    return await this.prisma.appointmentTime.findMany({
      where: {
        userId: parseInt(userId),
        time: {
          gte: today.toISOString(),
          lte: date.toISOString(),
        },
      },
    });
  }

  async getTotalHoursWorkedMonth(userId: string) {
    const now = new Date();

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const allAppoimentsMonth = await this.prisma.appointmentTime.findMany({
      where: {
        userId: parseInt(userId),
        time: {
          lte: lastDay.toISOString(),
          gte: firstDay.toISOString(),
        },
      },
    });

    let totalSeconds = 0;
    if (allAppoimentsMonth.length > 0) {
      allAppoimentsMonth.forEach((appoiment, i) => {
        if (
          appoiment.type == 'ENTRY' &&
          i != allAppoimentsMonth.length-1 &&
          allAppoimentsMonth[i + 1].type == 'OUT'
        ) {
          const start = moment(appoiment.time);
          const end = moment(allAppoimentsMonth[i + 1].time);

          const diff = moment.duration(end.diff(start));
          totalSeconds = totalSeconds + diff.asSeconds();
        }
      });
    }
    return {
      totalHoursWorkedMonth: moment.utc(totalSeconds * 1000).format('HH:mm'),
    };
  }
}
