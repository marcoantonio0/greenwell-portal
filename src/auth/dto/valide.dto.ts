import { IsEmail, IsNotEmpty } from 'class-validator';

export class ValidateDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
