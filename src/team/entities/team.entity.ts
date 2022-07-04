import { Prisma } from '@prisma/client';
export class Team implements Prisma.TeamUncheckedCreateInput {
  id?: number;
  name: string;
  managerId?: number;
  user?: Prisma.UserUncheckedCreateNestedManyWithoutTeamInput;
}
