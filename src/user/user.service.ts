import { PrismaService } from './../_prisma/_prisma.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Address, Profile, User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const preUser = await this.findPreUser(createUserDto.email);
    if (!preUser) {
      throw new NotFoundException(
        'Nenhum pre-cadastrado email correspondente.',
      );
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto = { ...createUserDto, password: hashPassword };
    let user: User;
    let address: Address;
    try {
      user = await this.prisma.user.create({
        data: {
          last_name: createUserDto.last_name,
          name: createUserDto.name,
          password: hashPassword,
          email: preUser.email,
          teamId: preUser.teamId,
        },
      });
    } catch (error) {
      if (error.meta.target[0] == 'email') {
        throw new BadRequestException('E-mail já cadastrado.');
      }
      throw new InternalServerErrorException();
    }
    if (user) {
      try {
        address = await this.prisma.address.create({
          data: {
            address: createUserDto.address,
            city: createUserDto.city,
            state: createUserDto.state,
            number: createUserDto.number,
            neighborhood: createUserDto.neighborhood,
            complement: createUserDto.complement,
            cep: createUserDto.cep,
            userId: user.id,
          },
        });
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
    if (address) {
      try {
        await this.prisma.profile.create({
          data: {
            bio: createUserDto.bio,
            linkedin: createUserDto.linkedin,
            github: createUserDto.github,
            userId: user.id,
          },
        });
        await this.prisma.preUser.delete({ where: { id: preUser.id } });
        return new HttpException(
          'Registro finalizado com sucesso',
          HttpStatus.OK,
        );
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOne(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findPreUser(email: string) {
    return await this.prisma.preUser.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
