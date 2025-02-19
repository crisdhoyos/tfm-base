import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  dropSchema: false,
  logging: true,
  logger: 'file',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*.ts'],
  // subscribers: ['src/subscriber/**/*.ts'],
  // migrationsTableName: 'migration_table',
});
