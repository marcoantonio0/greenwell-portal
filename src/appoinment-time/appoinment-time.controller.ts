import { Request } from 'express';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AppoinmentTimeService } from './appoinment-time.service';
import { CreateAppoinmentTimeDto } from './dto/create-appoinment-time.dto';
import { UpdateAppoinmentTimeDto } from './dto/update-appoinment-time.dto';

@Controller('appoinment-time')
export class AppoinmentTimeController {
  constructor(private readonly appoinmentTimeService: AppoinmentTimeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createAppoinmentTime(@Req() req: Request) {
    return this.appoinmentTimeService.appoimentCreate(req.user['userId']);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getTodayAppoiments(@Req() req: Request) {
    return this.appoinmentTimeService.getAppoimentsToday(req.user['userId']);
  }

  @UseGuards(JwtAuthGuard)
  @Get('month')
  getTotalHoursWorkedMonth(@Req() req: Request) {
    return this.appoinmentTimeService.getTotalHoursWorkedMonth(
      req.user['userId'],
    );
  }
}
