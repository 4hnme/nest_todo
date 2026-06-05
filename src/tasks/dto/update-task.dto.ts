import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ example: 'Buy milk' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  done: boolean;
}
