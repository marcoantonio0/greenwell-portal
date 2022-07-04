import { PrismaService } from 'src/_prisma/_prisma.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}
  async create(createNewsDto: CreateNewsDto) {
    try {
      return await this.prisma.news.create({ data: createNewsDto });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.prisma.news.findMany();
  }

  async findOne(id: number) {
    const news = await this.prisma.news.findUnique({ where: { id } });
    if (!news) {
      throw new NotFoundException();
    }
    return news;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  async remove(id: number) {
    try {
      await this.prisma.news.delete({ where: { id } });
      return new HttpException('Deletado com sucesso.', HttpStatus.OK);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
