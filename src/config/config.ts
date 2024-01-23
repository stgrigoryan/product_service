import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT) || 3000,
  mongo: {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DBNAME,
    url: `mongodb://mongo:27017/admin`,
  },
  rabbitmq: {
    url: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@rabbitmq:5672`,
    queue: process.env.RABBITMQ_QUEUE,
  },
};
