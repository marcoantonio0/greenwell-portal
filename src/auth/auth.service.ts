import { PrismaService } from './../_prisma/_prisma.service';
import { UserService } from './../user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ValidateDto } from './dto/valide.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const isPassword = await bcrypt.compare(pass, user.password);
    if (user && isPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async valideEmail(data: ValidateDto): Promise<any> {
    const user = await this.userService.findOne(data.email);
    let preUser;
    if (!user) {
      preUser = await this.userService.findPreUser(data.email);
    } else {
      return { email: user.email, isValid: true };
    }
    console.log(preUser);
    if (!preUser) {
      throw new NotFoundException(
        'Este e-mail não corresponde a uma conta cadastrada.',
      );
    } else {
      return {
        ...preUser,
        isPreUser: true,
      };
    }
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async me(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        name: true,
        last_name: true,
        email: true,
        isAdmin: true,
        team: {
          select: {
            manager: {
              select: {
                name: true,
                last_name: true,
              },
            },
            name: true,
            id: true,
          },
        },
        notifications: true,
        occupation: true,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    if (!user.isAdmin) {
      user.isAdmin = undefined;
    }
    return user;
  }
}
