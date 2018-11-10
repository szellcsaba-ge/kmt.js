import * as fs from 'fs';

import { CpuLoadMetric } from "@metrics/CpuLoadMetric";
import { MetricOptions } from "@models/MetricOptions";
import { Watcher } from '@watchers/Watcher';

export class CpuLoadMetricWatcher
 extends Watcher {
  private fs = fs;
  public metric: any;
  public metricName = 'cpuload';
  public metricType = 'cpuload';

  constructor(options: MetricOptions = new MetricOptions()) {
    super(options);
    this.metric = new CpuLoadMetric(this.fs);
  }
}
