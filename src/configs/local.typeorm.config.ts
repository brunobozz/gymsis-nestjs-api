import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 3500,
  username: 'pguser',
  password: 'pgpassword',
  database: 'gymsis',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
