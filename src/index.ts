import 'module-alias/register.js';
import { Server } from 'http';
import envConfig from './config/env.config';
import db from './db/knex';
import app from './app';

const PORT = envConfig.PORT;

//handle Uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await db.raw('SELECT 1+1 AS result');
    console.log('DATABASE CONNECTION SUCCESSFUL');

    server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (e) {
    console.error('DATABASE CONNECTION FAILED', e);
    process.exit(1);
  }

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (error) => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });

  // Handle SIGTERM (graceful shutdown)
  process.on('SIGTERM', () => {
    console.info('SIGTERM received. Shutting down gracefully...');
    if (server) {
      server.close(() => {
        console.info('Server closed');
        process.exit(0);
      });
    }
  });
}

bootstrap();
