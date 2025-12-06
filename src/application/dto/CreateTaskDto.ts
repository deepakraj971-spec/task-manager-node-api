import { IsEnum, IsOptional, IsString, MaxLength, IsDateString } from 'class-validator';
import { Priority, Status } from '../../domain/entities/TaskItem';

export class CreateTaskDto {
  @IsString()
  @MaxLength(200)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority: Priority = Priority.Medium;

  @IsOptional()
  @IsEnum(Status)
  status: Status = Status.Pending;
}
