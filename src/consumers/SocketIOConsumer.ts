import { MetricValue } from '@models/MetricValue';
import * as socketio from 'socket.io';

export class SocketIOConsumerOptions {
  port: number = 8012;
  interval: number = 5000;
};

export class SocketIOConsumer {
  public io: any;
  public metrics: any = {};
  public options: SocketIOConsumerOptions = {
    port: 8012,
    interval: 5000,
  }

  constructor(options: { port?: number, interval?: number } = {}) {
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
