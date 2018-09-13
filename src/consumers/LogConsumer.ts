import { MetricValue } from '@models/MetricValue';
import * as fs from 'fs';

export class LogConsumer {
  public logFile: string = 'log.log';

  constructor(public targetDirectory: string = '.') {
  }

  formatLogLine(value: MetricValue) {
    return JSON.stringify(value) + '\n';
  }

  consume(value: MetricValue) {
    fs.appendFileSync(`${this.targetDirectory}/${this.logFile}`, this.formatLogLine(value));
  }
}
