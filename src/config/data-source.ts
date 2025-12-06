import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';
import { TaskItem } from '../domain/entities/TaskItem';
import { User } from '../domain/entities/User';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  synchronize: false, // true for quick dev; false with migrations for prod
  logging: env.nodeEnv !== 'production',
  entities: [TaskItem, User],
  options: {
    encrypt: false, // set true for Azure SQL or TLS
  },
});
