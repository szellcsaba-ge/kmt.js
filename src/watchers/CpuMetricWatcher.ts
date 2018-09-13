import * as os from 'os';

import { CpuMetric } from "@metrics/CpuMetric";
import { MetricOptions } from "@models/MetricOptions";
import { Watcher } from '@watchers/Watcher';

export class CpuMetricWatcher extends Watcher {
  private os = os;
  public metric: any;
  public metricName = 'cpu';

  constructor(options: MetricOptions = new MetricOptions()) {
    super(options);
    this.metric = new CpuMetric(this.os);
  }
}
