export class MetricValue {
  public timeStamp: Date;
  public metricType: string = '';

  constructor(public name: string = '', public value: number = 0) {
    this.timeStamp = new Date();
  }
}
