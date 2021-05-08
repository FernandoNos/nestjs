import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreteTaskDTO } from "./dtos/create-task.dto";
import { GetTaskFilterDto } from "./dtos/get-task-filter.dto";
import { TaskStatus } from "./enums/task-status.enum";
import { User } from "../auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(filterDto: GetTaskFilterDto, user:User): Promise<Task[]>{
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', {userId: user.id})

    if(status){
      query.andWhere('task.status = :status',{ status });
    }
    if(search){
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: '%'+search+'%' })
    }

    const tasks = query.getMany();
    return tasks;
  }

  async createTask(createTaskDTO: CreteTaskDTO, user:User): Promise<Task> {
    const task = new Task();
    const { title, description } = createTaskDTO;
    task.title = title;
    task.user = user;
    task.description = description;
    task.status = TaskStatus.OPEN;
    return task.save()
  }
}