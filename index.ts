import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetricValue } from './MetricValue';
import { CpuMetricWatcher } from './CpuMetricWatcher';

let watcher = new CpuMetricWatcher();
let cpuMetricStream = new BehaviorSubject(new MetricValue());
watcher.schedule(cpuMetricStream);

cpuMetricStream.pipe(
  map((value, index) => {
    console.log('bh value: ', value, ', index: ', index);
  })
).subscribe();
