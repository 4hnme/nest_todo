import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  userId: number;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  password: string;
}

// TODO: probably should add this + validation pipe
// export const UserD = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );
