import * as request from "request-promise-native";

import { HttpMetric } from "@metrics/HttpMetric";
import { MetricOptions } from "@models/MetricOptions";
import { Watcher } from '@watchers/Watcher';

export class HttpMetricWatcher extends Watcher {
  private request = request;
  public metric: any;
  public metricName = 'http';
  public metricType = 'http';

  constructor(options: MetricOptions = new MetricOptions()) {
    super(options);
    this.metric = new HttpMetric(this.request);
  }
}
