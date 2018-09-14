import { BehaviorSubject } from "rxjs";
import { MetricOptions } from "@models/MetricOptions";
import { MetricValue } from "@models/MetricValue";
import { MetricSeparator } from "@models/MetricSeparator";
import { isArray } from "util";

export class Watcher {
  public metric: any;
  public metricName: string = 'default';
  public metricType: string = 'default';
  private options: MetricOptions = {
    interval: 1000,
  }
  public timer: any;

  constructor(options: MetricOptions = new MetricOptions()) {
    this.options.interval = options.interval || this.options.interval;
  }

  emit(stream: BehaviorSubject<MetricValue>, value: MetricValue) {
    value.metricType = this.metricType;
    stream.next(value);
  }

  schedule(stream: BehaviorSubject<MetricValue>) {
    this.timer = setInterval(() => {
      let currentValue: MetricValue = new MetricValue(this.metricName, this.metric.getCurrentValue());
      if (isArray(currentValue.value)) {
        currentValue.value.map(singleMetric => {
          this.emit(stream, new MetricValue(currentValue.name + MetricSeparator + singleMetric.name, singleMetric.value));
        });
      } else {
        this.emit(stream, currentValue);
      }
    }, this.options.interval);
  }

  stop() {
    clearInterval(this.timer);
  }
}
