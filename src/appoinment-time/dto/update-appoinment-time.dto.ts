import { PartialType } from '@nestjs/mapped-types';
import { CreateAppoinmentTimeDto } from './create-appoinment-time.dto';

export class UpdateAppoinmentTimeDto extends PartialType(CreateAppoinmentTimeDto) {}
