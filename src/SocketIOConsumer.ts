import { MetricValue } from './MetricValue';
import * as socketio from 'socket.io';

export type SocketIOConsumerOptions = { port?: number, interval?: number };

export class SocketIOConsumer {
  public io: any;
  public metrics: any = {};
  public options: SocketIOConsumerOptions = {
    port: 8012,
    interval: 5000,
  }

  constructor(options: SocketIOConsumerOptions = {}) {
    this.options.port = options.port || this.options.port;
    this.options.interval = options.interval || this.options.interval || 0;

    this.io = socketio.default.listen(this.options.port);
    setInterval(() => { this.deliver() }, this.options.interval);
  }

  consume(value: MetricValue) {
    this.metrics[value.name] = value;
  }

  deliver() {
    this.io.emit('deliver', this.metrics);
  }
}
