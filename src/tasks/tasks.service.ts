import { Injectable, NotFoundException } from "@nestjs/common";
import { CreteTaskDTO } from "./dtos/create-task.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTaskById(id: number) : Promise<Task>{
    const found = await this.taskRepository.findOne(id);

    if(!found)
      throw new NotFoundException(`Task not found with id ${id}`)
    return found
  }
  // private tasks : TaskModel[]= [];
  //
  // getAllTasks() : TaskModel[]{
  //   return this.tasks;
  // }
  //
  // getTasksWithFilters(filterDto: GetTaskFilterDto): TaskModel[]{
  //   const {status, search} = filterDto;
  //   let tasks = this.getAllTasks()
  //
  //   if(status) tasks = tasks.filter(task => task.status === status)
  //   if(search) tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
  //
  //   return tasks
  // }
  //
  // getTaskById(id: string) : TaskModel{
  //   const found = this.tasks.find(task => task.id === id);
  //   if(!found)
  //     throw new NotFoundException();
  //   return found
  // }
  //
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id)
  //   this.tasks = this.tasks.filter(task => task.id !== found.id)
  //
  // }
  //
  async createTask(createTaskDto: CreteTaskDTO) : Promise<Task>{
    return this.taskRepository.createTask(createTaskDto);
  }
  //
  // updateTask(id: string, status: TaskStatus): TaskModel{
  //   const existingTask = this.tasks.find(task => task.id === id)
  //
  //   if(existingTask) existingTask['status'] = status
  //
  //   return existingTask
  // }
}
