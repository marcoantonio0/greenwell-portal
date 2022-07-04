import { IsNotEmpty } from 'class-validator';
import { News } from './../entities/news.entity';
export class CreateNewsDto extends News {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
}
