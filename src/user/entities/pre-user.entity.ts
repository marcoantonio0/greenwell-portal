import { Prisma } from '@prisma/client';

export class PreUser implements Prisma.PreUserUncheckedCreateInput {
  id?: number;
  name?: string;
  teamId?: number;
  email: string;
}
