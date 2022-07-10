import { Prisma, ProjectStatus } from '@prisma/client';
export class Project implements Prisma.ProjectUncheckedCreateInput {
  title: string;
  pos?: number;
  id?: number;
  managerId?: number;
  description?: string;
  teamId: number;
  deadline?: string | Date;
  status?: ProjectStatus;
  createdAt?: string | Date;
  comments?: Prisma.CommentUncheckedCreateNestedManyWithoutProjectInput;
  updatedAt?: string | Date;
  tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutProjectInput;
}
