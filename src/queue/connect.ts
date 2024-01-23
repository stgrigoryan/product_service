import client, { Channel, Connection } from 'amqplib';
import { config } from '../config/config';

interface RabbitMQState {
  connection: Connection | null;
  channel: Channel | null;
}

export const state: RabbitMQState = { connection: null, channel: null };

export async function rbmqConnect() {
  state.connection = await client.connect(config.rabbitmq.url);
  state.channel = await state.connection.createChannel();
}

export async function rbmqDisconnect() {
  if (state.channel) {
    await state.channel.close();
  }
  if (state.connection) {
    await state.connection.close();
  }
}
