import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-3-218-171-44.compute-1.amazonaws.com',
  port: 5432,
  username: 'spyhijwmmuwcvv',
  password: '12f16037088072a21915ed2274380f7f162e7a4f307da89150fdea9349691648',
  database: 'd2q3u72j43bkdi',
  autoLoadEntities: true,
  entities: ['../**/*.entity.ts'],
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
