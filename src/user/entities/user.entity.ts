import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  occupationId?: number;
  isAdmin?: boolean;
  teamId?: number;
  appointmentTimes?: Prisma.appointmentTimeUncheckedCreateNestedManyWithoutUserInput;
  managerAt?: Prisma.TeamUncheckedCreateNestedManyWithoutManagerInput;

}
