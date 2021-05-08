import { Injectable, NotFoundException } from "@nestjs/common";
import { CreteTaskDTO } from "./dtos/create-task.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { GetTaskFilterDto } from "./dtos/get-task-filter.dto";
import { TaskStatus } from "./enums/task-status.enum";
import { User } from "../auth/user.entity";

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTaskById(id: number, user:User) : Promise<Task>{
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id}});

    if(!found)
      throw new NotFoundException(`Task not found with id ${id}`)
    return found
  }

  async deleteTaskById(id: number, user:User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id })
    if(result.affected === 0)
      throw new NotFoundException()

  }

  async getTasks(filterDto: GetTaskFilterDto, user:User): Promise<Task[]>{
    return this.taskRepository.getTasks(filterDto, user);
  }

  async createTask(createTaskDto: CreteTaskDTO, user:User) : Promise<Task>{
    const newTask = await  this.taskRepository.createTask(createTaskDto, user);
    delete newTask.user
    return newTask
  }

  async updateTask(id: number, status: TaskStatus, user:User) : Promise<Task>{
    const existingTask = await this.getTaskById(id, user)

    existingTask.status = status
    await existingTask.save()

    return existingTask
  }
}
