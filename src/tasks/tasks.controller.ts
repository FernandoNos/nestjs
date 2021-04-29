import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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

@Controller('tasks')
export class TasksController {
  constructor(private  tasksService: TasksService){}

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number) : Promise<Task>{
    return this.tasksService.getTaskById(id)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id)
  }

  @Get()
  getAllTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) : Promise<Task[]>{
    return this.tasksService.getTasks(filterDto)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreteTaskDTO): Promise<Task>{
    return this.tasksService.createTask(createTaskDTO)
  }

  @Patch('/:id/status')
  updateTask(@Param('id', ParseIntPipe) id: number,
             @Param('field') field: string,
             @Body('status', TaskStatusValidationPipe) updateTask: TaskStatus ) : Promise<Task>{
    return this.tasksService.updateTask(id, updateTask)
  }
}

