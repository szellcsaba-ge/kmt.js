import * as os from 'os';

import { MemoryMetric } from "@metrics/MemoryMetric";
import { MetricOptions } from "@models/MetricOptions";
import { Watcher } from '@watchers/Watcher';

export class MemoryMetricWatcher extends Watcher {
  private os = os;
  public metric: any;
  public metricName = 'memory';

  constructor(options: MetricOptions = new MetricOptions()) {
    super(options);
    this.metric = new MemoryMetric(this.os);
  }
}
