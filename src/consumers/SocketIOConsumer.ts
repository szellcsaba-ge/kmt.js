import { MetricValue } from '@models/MetricValue';
import * as socketio from 'socket.io';

export enum EmitMethod {
  last = 'LAST',
  average = 'AVERAGE',
  sum = 'SUM',
}

export class SocketIOConsumerOptions {
  port: number = 8012;
  interval: number = 5000;
  emitMethod: EmitMethod = EmitMethod.sum;
};

export class SocketIOConsumer {
  public io: any;
  public metrics: any = {};
  public options: SocketIOConsumerOptions = {
    port: 8012,
    interval: 5000,
    emitMethod: EmitMethod.sum,
  }

  constructor(options:
    {
      port?: number,
      interval?: number,
      emitMethod?: EmitMethod
    } = {}
  ) {
    this.options.port = options.port || this.options.port;
    this.options.interval = options.interval || this.options.interval || 0;
    this.options.emitMethod = options.emitMethod || this.options.emitMethod || 0;

    this.io = socketio.default.listen(this.options.port);
    setInterval(() => { this.deliver() }, this.options.interval);
  }

  consume(value: MetricValue) {
    if (this.options.emitMethod == EmitMethod.last) {
      this.metrics[value.name] = value;
    }
    if (this.options.emitMethod == EmitMethod.average || this.options.emitMethod == EmitMethod.sum) {
      this.metrics[value.name] = [ ... this.metrics[value.name] || [], value ];
    }
  }

  deliver() {
    if (this.options.emitMethod == EmitMethod.last || this.options.emitMethod == EmitMethod.sum) {
      this.io.emit('deliver', [ this.metrics ]);
    }
    if (this.options.emitMethod == EmitMethod.average) {
      const emitMetrics: any = {};
      Object.keys(this.metrics).forEach((value: string) => {
        emitMetrics[value] = this.metrics[value].reduce((acc: MetricValue, curr: MetricValue, index: number, arr: MetricValue[]) => {
          acc.value += curr.value / arr.length;
          return acc;
        }, { value: 0 });
      });
      this.io.emit('deliver', [ emitMetrics ]);
    }
    this.metrics = {};
  }
}
