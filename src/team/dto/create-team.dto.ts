import { IsNotEmpty } from 'class-validator';
import { Team } from './../entities/team.entity';
export class CreateTeamDto extends Team {
  @IsNotEmpty()
  name: string;
}
