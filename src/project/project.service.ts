import { PrismaService } from './../_prisma/_prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async create(createProjectDto: CreateProjectDto) {
    return await this.prisma.project.create({ data: createProjectDto });
  }

  async findAll() {
    const projectOrdenate = [
      {
        type: 'BACKLOG',
        items: [],
      },
      {
        type: 'WORKING',
        items: [],
      },
      {
        type: 'IN_PROGRESS',
        items: [],
      },
      {
        type: 'COMPLETE',
        items: [],
      },
    ];
    const projects = await this.prisma.project.findMany({
      select: {
        manager: true,
        createdAt: true,
        deadline: true,
        description: true,
        status: true,
        updatedAt: true,
        id: true,
        name: true,
        pos: true,
        _count: {
          select: {
            comments: true,
            tasks: true,
          },
        },
      },
      orderBy: { pos: 'asc' },
    });
    if (projects.length > 0) {
      projects.forEach((project) => {
        projectOrdenate.forEach((order) => {
          if (project.status == order.type) {
            order.items.push(project);
          }
        });
      });
    }
    return projectOrdenate;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
