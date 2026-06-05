import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

const ext = process.env.NODE_ENV === 'production' ? '.js' : '.ts';
export const AppDataSource = new DataSource({
  ...(typeOrmConfig as any),
  migrations: [__dirname + `/migrations/*${ext}`],
});
