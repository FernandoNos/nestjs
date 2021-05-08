import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreteTaskDTO } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { GetTaskFilterDto } from "./dtos/get-task-filter.dto";
import { filter } from "rxjs/operators";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { Validate } from "class-validator";
import { Task } from "./task.entity";
import { TaskStatus } from "./enums/task-status.enum";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../auth/user.entity";
import { GetUser } from "../auth/get-user.decorator";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');
  constructor(private  tasksService: TasksService){}

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number,
              @GetUser() user: User) : Promise<Task>{
    return this.tasksService.getTaskById(id, user)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTaskById(id, user)
  }

  @Get()
  getAllTasks(
    @GetUser() user:User,
    @Query(ValidationPipe) filterDto: GetTaskFilterDto) : Promise<Task[]>{
    this.logger.verbose(`User ${user.username} retrieving all tasks! Filters: ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(filterDto, user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreteTaskDTO,
             @GetUser() user: User): Promise<Task>{
    this.logger.verbose(`User ${user.username} creating new task ${JSON.stringify(createTaskDTO)}`)
    return this.tasksService.createTask(createTaskDTO, user)
  }

  @Patch('/:id/status')
  updateTask(@Param('id', ParseIntPipe) id: number,
             @Param('field') field: string,
             @GetUser() user: User,
             @Body('status', TaskStatusValidationPipe) updateTask: TaskStatus ) : Promise<Task>{
    return this.tasksService.updateTask(id, updateTask, user)
  }
}

