import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';
import { ValidateDto } from './dto/valide.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/validate')
  async valideAccount(@Body() data: ValidateDto) {
    return this.authService.valideEmail(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    return this.authService.me(req.user['userId']);
  }
}
