import { PrismaService } from './../_prisma/_prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  create(createProjectDto: CreateProjectDto) {}

  findAll() {
    return `This action returns all project`;
  }

  async findPedingByMember(userId: string) {
    console.log(userId);
    const projects = await this.prisma.projectMembers.findMany({
      where: {
        userId: parseInt(userId),
      },
      select: {
        user: false,
        project: true,
      },
    });
    return projects;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
