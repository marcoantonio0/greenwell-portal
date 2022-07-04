import { PrismaService } from './../_prisma/_prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto = { ...createUserDto, password: hashPassword };
      return await this.prisma.user.create({ data: createUserDto });
    } catch (error) {
      if (error.meta.target[0] == 'email') {
        throw new BadRequestException('E-mail já cadastrado.');
      }
      throw new InternalServerErrorException();
    }
  }

  async findOne(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
