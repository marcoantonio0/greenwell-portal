import { appointmentTimeType, Prisma } from '@prisma/client';
export class AppoinmentTime
  implements Prisma.appointmentTimeUncheckedCreateInput
{
  type: appointmentTimeType;
  id?: number;
  time?: string | Date;
  userId: number;
}
