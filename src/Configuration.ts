import * as os from 'os';

import {
  CpuMetricWatcher,
  MemoryMetricWatcher,
  UptimeMetricWatcher,
  HttpMetricWatcher,

} from '@watchers/Watchers';

import {
  ConsoleConsumer,
  LogConsumer,
  SocketIOConsumer,
  BufferConsumer,
  EmitMethod,
} from '@consumers/Consumers';

export const NodeConfig = {
  nodeName: os.hostname,
  consumers: [
    new ConsoleConsumer(),
    new LogConsumer('logs'),
    new SocketIOConsumer({ emitMethod: EmitMethod.average, interval: 1000 }),
    new BufferConsumer(),
  ]
};

let defaultParser = (value: any, index: number) => {
  NodeConfig.consumers.forEach((consumer) => {
    consumer.consume(value);
  })
};

export const StreamConfig = [
  {
    name: 'cpu',
    watcher: CpuMetricWatcher,
    options: { interval: 500 },
    parser: defaultParser,
  },
  {
    name: 'memory',
    watcher: MemoryMetricWatcher,
    options: { interval: 500 },
    parser: defaultParser,
  },
  {
  name: 'uptime',
  watcher: UptimeMetricWatcher,
  options: { interval: 500 },
  parser: defaultParser,
},
  {
    name: 'http',
    watcher: HttpMetricWatcher,
    options: { interval: 500, baseUrl: 'https://www.index.hu' },
    parser: defaultParser,
  },
];

