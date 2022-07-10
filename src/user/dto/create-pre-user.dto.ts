import { PreUser } from './../entities/pre-user.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePreUserDto extends PreUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  teamId: number;

  @IsString()
  name: string;
}
