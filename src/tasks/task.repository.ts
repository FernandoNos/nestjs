import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreteTaskDTO } from "./dtos/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreteTaskDTO): Promise<Task> {
    const task = new Task();
    const { title, description } = createTaskDTO;
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    return task.save()
  }
}