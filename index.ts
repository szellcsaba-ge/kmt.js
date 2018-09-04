import { BehaviorSubject } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { MetricValue } from './MetricValue';
import { StreamConfig, NodeConfig } from './Configuration';

let watchers: any = {};
let streams: any = {};

StreamConfig.forEach((value, index, arr) => {
  watchers[value.name] = new (value.watcher)(value.options);
  streams[value.name] = new BehaviorSubject(new MetricValue());
  watchers[value.name].schedule(streams[value.name]);
  streams[value.name].pipe(skip(1), map(value.parser)).subscribe();
});
