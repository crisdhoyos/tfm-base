import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  extra: {},
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  // entities: ['dist/**/*.entity{.ts,.js}'],
  // seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: __dirname + '/migrations/',
  // },
});
