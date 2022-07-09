import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  address: string;

  complement: string;

  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  bio: string;

  linkedin: string;

  github: string;
}
