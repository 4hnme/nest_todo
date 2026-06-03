import { IsString, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  description: string;

  @IsBoolean()
  done: boolean;
}
