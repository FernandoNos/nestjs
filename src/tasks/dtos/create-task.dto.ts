import { IsNotEmpty } from "class-validator";

export class CreteTaskDTO{
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}