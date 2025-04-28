import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  PORT: process.env.PORT ?? 5000,
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_USER: process.env.DB_USER ?? 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'S@dm@n#95',
  DB_NAME: process.env.DB_NAME ?? 'bookstore-db',
  DB_PORT: process.env.DB_PORT ?? 5432,
  JWT_SECRET: process.env.JWT_SECRET ?? 'my-secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? 'my-refresh-secret',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? '14d',
};
