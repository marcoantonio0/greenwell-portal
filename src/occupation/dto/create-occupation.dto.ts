import { IsNotEmpty } from 'class-validator';
import { Occupation } from './../entities/occupation.entity';
export class CreateOccupationDto extends Occupation {
  @IsNotEmpty()
  name: string;
}
