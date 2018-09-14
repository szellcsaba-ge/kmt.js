import * as driveList from 'drivelist';
import * as diskUsage from 'diskusage';

import { DiskFreeMetric } from "@metrics/DiskFreeMetric";
import { MetricOptions } from "@models/MetricOptions";
import { Watcher } from '@watchers/Watcher';

export class DiskFreeMetricWatcher extends Watcher {
  private driveList = driveList;
  private diskUsage = diskUsage;
  public metric: any;
  public metricName = 'drives';
  public metricType = 'drives';

  constructor(options: MetricOptions = new MetricOptions()) {
    super(options);
    this.metric = new DiskFreeMetric(this.driveList, this.diskUsage);
  }
}
