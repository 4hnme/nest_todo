import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: false })
  done: boolean;

  @CreateDateColumn()
  create_date: Date;
}
