import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Task } from './entities/task.entity'
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.tasksRepository.create({ ...createTaskDto });
    return this.tasksRepository.save(task);
  }

  async findAll() {
    return this.tasksRepository.find();
  }

  async findOne(id: number) {
    await this.existsOrFail(id);
    return this.tasksRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.existsOrFail(id);
    await this.tasksRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.existsOrFail(id);
    return this.tasksRepository.delete(id);
  }
}
