import { Prisma } from '@prisma/client';
export class News implements Prisma.NewsUncheckedCreateInput {
  id?: number;
  title: string;
  subTitle?: string;
  content: string;
  authorId?: number;
  createdAt?: string | Date;
}
