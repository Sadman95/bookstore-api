import envConfig from '@/config/env.config';
import type { Knex } from 'knex';

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: envConfig.DB_HOST,
      user: envConfig.DB_USER,
      password: envConfig.DB_PASSWORD,
      database: envConfig.DB_NAME,
      port: Number(envConfig.DB_PORT),
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};


