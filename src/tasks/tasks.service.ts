import { Injectable, Request, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm'
import { Task } from './entities/task.entity'
import { User } from '../users/entities/user.entity'
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';

const checkExistance = false;

@Injectable()
export class TasksService {
  constructor (
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  private readonly logger = new Logger("TasksService", { timestamp: false });

  // TODO: for now, it only accepts ids
  async existsOrFail(id: number) {
    if (!checkExistance) return;
    const exists = await this.tasksRepository.exists({ where: { id } });
    if (!exists) {
      this.logger.log(`ERROR: Task ${id} doesn't exist`);
      throw new NotFoundException(`Task ${id} doesn't exist`);
    }
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = await this.tasksRepository.create({ username: user.username, ...createTaskDto });
    return this.tasksRepository.save(task);
  }

  async findAll(user: User): Promise<Task[]> {
    const username = user.username;
    return this.tasksRepository.find({where: { username }});
  }

  // TODO: add User to here
  async findOne(id: number, user: User): Promise<Task> {
    await this.existsOrFail(id);
    const username = user.username;
    const result = await this.tasksRepository.find({where: { id, username }});
    if (result.length > 0) {
      return result[0];
    } else {
      throw new NotFoundException(`Task ${id} doesn't exist`);
    }
  }

  // export declare interface UpdateResult<TSchema extends Document = Document> {
  async update(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    await this.existsOrFail(id);
    const result = await this.tasksRepository.update(id, updateTaskDto);
    if (result.affected == 0) {
      throw new NotFoundException(`Task ${id} doesn't exist`);
    }
    return this.findOne(id, user);
  }

  // taken from node_modules/typeorm/query-builder/result/DeleteResult.d.ts
  // TODO: this for now doesn't check for user validity ¯\_(ツ)_/¯
  async remove(id: number, user: User): Promise<DeleteResult> {
    await this.existsOrFail(id);
    const result = await this.tasksRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`Task ${id} doesn't exist`);
    }
    return result;
  }
}
