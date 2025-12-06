import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum Status {
  Pending = 'Pending',
  Completed = 'Completed',
}

@Entity({ name: 'TaskItems' })
export class TaskItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  title!: string;

  @Column({ type: 'nvarchar', nullable: true })
  description?: string | null;

  @Column({ type: 'datetime2', nullable: true })
  dueDate?: Date | null;

  @Column({ type: 'nvarchar', default: Priority.Medium })
  priority!: Priority;

  @Column({ type: 'nvarchar', default: Status.Pending })
  status!: Status;

  @Index()
  @Column({ type: 'uniqueidentifier' })
  userId!: string;

  @CreateDateColumn({ type: 'datetime2' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime2' })
  updatedAt!: Date;
}
