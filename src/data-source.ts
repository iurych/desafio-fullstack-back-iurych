import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'node:path';
import 'dotenv/config';

const DataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}');
  const migrationsPath: string = path.join(
    __dirname,
    './migrations/**.{ts,js}'
  );

  if (!process.env.DATABASE_URL) {
    throw new Error("Missing env var: 'DATABASE_URL'");
  }

  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

export const AppDataSource: DataSource = new DataSource(DataSourceConfig());
