import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  name!: string;

  @Index({ unique: true })
  @Column({ length: 320 })
  email!: string;

  @Column({ length: 200 })
  passwordHash!: string;

  @CreateDateColumn({ type: 'datetime2' })
  createdAt!: Date;
}
