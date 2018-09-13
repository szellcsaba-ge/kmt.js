import { MetricValue } from '@models/MetricValue';

export class ConsoleConsumer {
  consume(value: MetricValue) {
    console.log(value);
  }
}