import { BehaviorSubject } from "rxjs";
import { MetricOptions } from "@models/MetricOptions";
import { MetricValue } from "@models/MetricValue";

export class Watcher {
  public metric: any;
  public metricName: string = 'default';
  private options: MetricOptions = {
    interval: 1000,
  }
  public timer: any;

  constructor(options: MetricOptions = new MetricOptions()) {
    this.options.interval = options.interval || this.options.interval;
  }

  schedule(stream: BehaviorSubject<MetricValue>) {
    this.timer = setInterval(() => {
      let currentValue: MetricValue = new MetricValue(this.metricName, this.metric.getCurrentValue());
      stream.next(currentValue);
    }, this.options.interval);
  }

  stop() {
    clearInterval(this.timer);
  }
}
