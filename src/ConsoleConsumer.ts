import { MetricValue } from "./MetricValue";

export class ConsoleConsumer {
  consume(value: MetricValue) {
    console.log(value);
  }
}