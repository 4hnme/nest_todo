import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { TasksController } from './tasks/tasks.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { Task } from './tasks/entities/task.entity';

const psql_port = process.env.POSTGRES_PORT;
const port = (psql_port === undefined || isNaN(Number(psql_port))) ? 5432 : Number(psql_port);

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST ?? 'db',
      port: port,
      username: process.env.POSTGRES_USER ?? 'dev',
      password: process.env.POSTGRES_PASSWORD ?? 'dev',
      database: process.env.POSTGRES_DB ?? 'psql_tasks',
      entities: [Task],
      synchronize: false,
    }),
    GuardModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TasksController);
  }
}
