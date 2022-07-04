import { Prisma } from '@prisma/client';
export class Occupation implements Prisma.OccupationUncheckedCreateInput {
  id?: number;
  name: string;
  users?: Prisma.UserUncheckedCreateNestedManyWithoutOccupationInput;
}
