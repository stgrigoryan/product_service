import { config } from '../config/config';
import { state } from './connect';

export async function sendMessage(message: string) {
  const queueName = config.rabbitmq.queue;
  if (!state.connection || !state.channel) {
    throw new Error('Connection not established.');
  }

  await state.channel.assertQueue(queueName, { durable: true });
  state.channel.sendToQueue(queueName, Buffer.from(message), {
    persistent: true,
  });
}
