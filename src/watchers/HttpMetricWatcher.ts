import * as request from "request-promise-native";

import { HttpMetric } from "@metrics/HttpMetric";
import { Watcher } from '@watchers/Watcher';
import { HttpMetricOptions } from "@models/HttpMetricOptions";

export class HttpMetricWatcher extends Watcher {
  private request = request;
  public metric: any;
  public metricName = 'http';
  public metricType = 'http';


  constructor(options: HttpMetricOptions = new HttpMetricOptions()) {
    super(options);
    this.metric = new HttpMetric(this.request, options.baseUrl);
  }
}
