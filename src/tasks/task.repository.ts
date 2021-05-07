import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreteTaskDTO } from "./dtos/create-task.dto";
import { GetTaskFilterDto } from "./dtos/get-task-filter.dto";
import { TaskStatus } from "./enums/task-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if(status){
      query.andWhere('task.status = :status',{ status });
    }
    if(search){
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: '%'+search+'%' })
    }

    const tasks = query.getMany();
    return tasks;
  }

  async createTask(createTaskDTO: CreteTaskDTO): Promise<Task> {
    const task = new Task();
    const { title, description } = createTaskDTO;
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    return task.save()
  }
}