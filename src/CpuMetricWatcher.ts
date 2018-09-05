import * as os from 'os';

import { CpuMetric } from "./CpuMetric";
import { MetricOptions } from "./MetricOptions";
import { BehaviorSubject } from "rxjs";
import { MetricValue } from "./MetricValue";

export class CpuMetricWatcher {
  private os = os;
  private metric: CpuMetric;
  private options: MetricOptions = {
    interval: 1000,
  }

  constructor(options: MetricOptions = new MetricOptions()) {
    this.options.interval = options.interval || this.options.interval;
    this.metric = new CpuMetric(this.os);
  }

  schedule(stream: BehaviorSubject<MetricValue>) {
    setInterval(() => {
      let currentValue: MetricValue = new MetricValue('cpu', this.metric.getCurrentValue());
      stream.next(currentValue);
    }, this.options.interval);
  }
}
