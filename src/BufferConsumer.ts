import { MetricValue } from './MetricValue';

export class BufferConsumerOptions {
  limit: number = 5;
};

export class BufferConsumer {
  public buffer: MetricValue[] = [];
  public options: BufferConsumerOptions = {
    limit: 5
  };

  constructor(options: { limit?: number } = {}) {
    this.options.limit = options.limit || this.options.limit;
  }

  consume(value: MetricValue) {
    this.buffer.push(value);
    while (this.buffer.length > this.options.limit) {
      this.buffer.shift();
    }
  }
}
