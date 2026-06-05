import { Task } from './tasks/entities/task.entity';
import { User } from './users/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const psql_port = process.env.POSTGRES_PORT;
const port = (psql_port === undefined || isNaN(Number(psql_port))) ? 5432 : Number(psql_port);

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST ?? 'db',
    port: port,
    username: process.env.POSTGRES_USER ?? 'dev',
    password: process.env.POSTGRES_PASSWORD ?? 'dev',
    database: process.env.POSTGRES_DB ?? 'psql_tasks',
    entities: [User, Task],
    synchronize: false,
};
