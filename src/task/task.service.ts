import { PrismaService } from './../_prisma/_prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      return await this.prisma.task.create({ data: createTaskDto });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all task`;
  }

  async findPendingStatus(userId: string) {
    return await this.prisma.task.findMany({
      where: {
        userId: parseInt(userId),
        status: {
          in: ['INACTIVE', 'IN_PROGRESS', 'DEV_TESTING', 'WORKING'],
        },
      },
      select: {
        id: true,
        status: true,
        title: true,
        project: {
          select: {
            title: true,
            id: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
