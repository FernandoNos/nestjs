import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../enums/task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{

  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]

  transform(value: any) {

    if(!this.isStatusValid(value)){
      throw new BadRequestException('Invalid status')
    }

    return value;
  }

  private isStatusValid(status: any){
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}