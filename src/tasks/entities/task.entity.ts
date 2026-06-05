import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tasks')
export class Task {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'Buy milk' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: 'alice' })
  @Column({ type: 'text', default: 'admin' })
  username: string;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  done: boolean;

  @ApiProperty({ example: '2026-06-05T12:34:56.789Z', type: String, format: 'date-time' })
  @CreateDateColumn()
  create_date: Date;
}
