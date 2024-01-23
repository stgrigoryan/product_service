import { mongoDisconnect } from './db/connect';
import * as http from 'http';
import { rbmqDisconnect } from './queue/connect';

export const gracefulShutdown = async (server: http.Server) => {
  console.log('Starting graceful shutdown');

  server.close((error) => {
    if (error) {
      console.error(`Error closing Express server: ${error}`);
    } else {
      console.log('Express server closed');
    }
  });

  await mongoDisconnect();
  console.log('MongoDB connection closed');

  await rbmqDisconnect();
  console.log('RabbitMQ connection closed');

  console.log('Graceful shutdown complete');
  process.exit(0);
};

export default gracefulShutdown;
