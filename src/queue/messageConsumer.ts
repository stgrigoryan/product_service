import { config } from '../config/config';
import { state } from './connect';

export async function consumeMessage() {
  const queueName = config.rabbitmq.queue;
  await state.channel.assertQueue(queueName, {
    durable: true,
  });
  const msg = await state.channel.get(queueName, { noAck: false });
  if (msg && msg?.content) {
    const message = JSON.parse(msg?.content?.toString());
    state.channel.ack(msg);
    return message;
  }
  throw new Error('No message in the queue.');
}
