import { CreatePreUserDto } from './dto/create-pre-user.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list() {
    return this.userService.list();
  }

  @UseGuards(JwtAuthGuard)
  @Get('pre-user')
  listPreUser() {
    return this.userService.listPreUser();
  }

  @UseGuards(JwtAuthGuard)
  @Post('pre-user')
  createPreUser(@Body() createPreUserDto: CreatePreUserDto) {
    return this.userService.createPreUser(createPreUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
