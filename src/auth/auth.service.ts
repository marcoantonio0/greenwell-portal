import { PrismaService } from './../_prisma/_prisma.service';
import { UserService } from './../user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
        phone: true,
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
