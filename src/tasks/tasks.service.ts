import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskModel, TaskStatus } from "./task.model";
import { v1 as uuid} from 'uuid';
import { CreteTaskDTO } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { GetTaskFilterDto } from "./dtos/get-task-filter.dto";
@Injectable()
export class TasksService {

  private tasks : TaskModel[]= [];

  getAllTasks() : TaskModel[]{
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): TaskModel[]{
    const {status, search} = filterDto;
    let tasks = this.getAllTasks()

    if(status) tasks = tasks.filter(task => task.status === status)
    if(search) tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))

    return tasks
  }

  getTaskById(id: string) : TaskModel{
    const found = this.tasks.find(task => task.id === id);
    if(!found)
      throw new NotFoundException();
    return found
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id)
    this.tasks = this.tasks.filter(task => task.id !== found.id)

  }

  createTask(createTaskDto: CreteTaskDTO) : TaskModel{
    const { title, description } = createTaskDto;
    const task : TaskModel = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task)
    return task
  }

  updateTask(id: string, status: TaskStatus): TaskModel{
    const existingTask = this.tasks.find(task => task.id === id)

    if(existingTask) existingTask['status'] = status

    return existingTask
  }
}
