import { IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy milk' })
  @IsString()
  description: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  done: boolean;
}
