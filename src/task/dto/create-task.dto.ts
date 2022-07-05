import { IsNotEmpty } from 'class-validator';
import { Task } from './../entities/task.entity';
export class CreateTaskDto extends Task {
  @IsNotEmpty()
  title: string;
}
