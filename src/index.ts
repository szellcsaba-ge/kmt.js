import { CustomModuleLoader } from './CustomModuleLoader';

let moduleLoader = new CustomModuleLoader();

import { BehaviorSubject } from 'rxjs';
import { map, skip } from 'rxjs/operators';

import { MetricValue } from '@models/MetricValue';
import { StreamConfig, NodeConfig } from './Configuration';

let watchers: any = {};
let streams: any = {};

StreamConfig.forEach((value: any, index, arr) => {
  watchers[value.name] = new (value.watcher)(value.options);
  streams[value.name] = new BehaviorSubject(new MetricValue());
  watchers[value.name].schedule(streams[value.name]);
  streams[value.name].pipe(skip(1), map(value.parser)).subscribe();
});
