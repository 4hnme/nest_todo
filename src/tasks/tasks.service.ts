import { Injectable, Request, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
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

  async create(createTaskDto: CreateTaskDto, user: User) {
    const task = await this.tasksRepository.create({ username: user.username, ...createTaskDto });
    return this.tasksRepository.save(task);
  }

  async findAll(user: User) {
    const username = user.username;
    return this.tasksRepository.find({where: { username }});
  }

  // TODO: add User to here
  async findOne(id: number, user: User) {
    await this.existsOrFail(id);
    const username = user.username;
    return this.tasksRepository.find({where: { id, username }});
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: User) {
    await this.existsOrFail(id);
    await this.tasksRepository.update(id, updateTaskDto);
    return this.findOne(id, user);
  }

  // TODO: this for now doesn't check for user validity ¯\_(ツ)_/¯
  async remove(id: number, user: User) {
    await this.existsOrFail(id);
    return this.tasksRepository.delete(id);
  }
}
