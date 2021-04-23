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

@Controller('tasks')
export class TasksController {
  constructor(private  tasksService: TasksService){}

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number) : Promise<Task>{
    return this.tasksService.getTaskById(id)
  }
  //
  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void {
  //   this.tasksService.deleteTaskById(id)
  // }
  //
  // @Get()
  // getAllTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto) : TaskModel[]{
  //   if(Object.keys(filterDto).length){
  //     return this.tasksService.getTasksWithFilters(filterDto)
  //   }else return this.tasksService.getAllTasks()
  // }
  //
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreteTaskDTO): Promise<Task>{
    return this.tasksService.createTask(createTaskDTO)
  }
  //
  // @Patch('/:id/status')
  // updateTask(@Param('id') id: string,
  //            @Param('field') field: string,
  //            @Body('status', TaskStatusValidationPipe) updateTask: TaskStatus ){
  //   return this.tasksService.updateTask(id, updateTask)
  // }
}

