import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a task' })
  @ApiCreatedResponse({ type: CreateTaskDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request'})
  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @ApiOperation({ summary: 'List all tasks' })
  @ApiOkResponse({ description: 'List of tasks', type: Task, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request'})
  @Get()
  @UseGuards(JwtGuard)
  async findAll(@Request() req): Promise<Task[]> {
    return this.tasksService.findAll(req.user);
  }

  // TODO: we need to somehow add logging to the ParseIntPipe. create a custom validator?
  @ApiOperation({ summary: 'Find task by id' })
  @ApiOkResponse({ description: 'Found task', type: Task })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request'})
  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<Task> {
    return this.tasksService.findOne(id, req.user);
  }

  @ApiOperation({ summary: 'Update a task by its id' })
  @ApiOkResponse({ description: 'Updated task', type: Task })
  @ApiBadRequestResponse({ description: 'Bad Request'})
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Patch(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto, @Request() req): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto, req.user);
  }

  @ApiOperation({ summary: 'Delete a task by its id' })
  @ApiOkResponse({ description: 'Deleted task', type: Task })
  @ApiBadRequestResponse({ description: 'Bad Request'})
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<DeleteResult> {
    return this.tasksService.remove(id, req.user);
  }
}
