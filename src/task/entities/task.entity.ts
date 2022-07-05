import { Prisma, TaskStatus } from '@prisma/client';
export class Task implements Prisma.TaskUncheckedCreateInput {
  id?: number;
  title: string;
  description?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  status?: TaskStatus;
  projectId: number;
  hoursSpended?: number;
  userId: number;
  comments?: Prisma.CommentUncheckedCreateNestedManyWithoutTaskInput;
}
