import { PrismaService } from './../_prisma/_prisma.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOccupationDto } from './dto/create-occupation.dto';
import { UpdateOccupationDto } from './dto/update-occupation.dto';

@Injectable()
export class OccupationService {
  constructor(private prisma: PrismaService) {}

  async create(createOccupationDto: CreateOccupationDto) {
    try {
      return await this.prisma.occupation.create({ data: createOccupationDto });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.occupation.findMany();
  }

  async findOne(id: number) {
    const occupation = await this.prisma.occupation.findUnique({
      where: { id },
    });
    if (!occupation) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateOccupationDto: UpdateOccupationDto) {
    try {
      return await this.prisma.occupation.update({
        where: { id },
        data: updateOccupationDto,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
