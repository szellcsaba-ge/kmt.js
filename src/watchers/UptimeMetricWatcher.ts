import * as os from 'os';

import { UptimeMetric } from "@metrics/UptimeMetric";
import { MetricOptions } from "@models/MetricOptions";
import { Watcher } from '@watchers/Watcher';

export class UptimeMetricWatcher extends Watcher {
  private os = os;
  public metric: any;
  public metricName = 'uptime';
  public metricType = 'uptime';

  constructor(options: MetricOptions = new MetricOptions()) {
    super(options);
    this.metric = new UptimeMetric(this.os);
  }
}
