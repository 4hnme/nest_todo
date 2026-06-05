import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

const ext = process.env.NODE_ENV === 'production' ? '.js' : '.ts';
const root = process.env.NODE_ENV === 'production' ? 'dist' : '.';
export const AppDataSource = new DataSource({
  ...(typeOrmConfig as any),
  migrations: [`${root}/migrations/*${ext}`],
});
