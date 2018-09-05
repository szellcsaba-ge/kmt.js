import * as os from 'os';

import {
  CpuMetricWatcher,
} from './Watchers';

import {
  ConsoleConsumer,
  LogConsumer,
  SocketIOConsumer,
  BufferConsumer,
} from './Consumers';

export const NodeConfig = {
  nodeName: os.hostname,
  consumers: [
    new ConsoleConsumer(),
    new LogConsumer('logs'),
    new SocketIOConsumer(),
    new BufferConsumer(),
  ]
};

export const StreamConfig = [
  {
    name: 'cpu',
    watcher: CpuMetricWatcher,
    options: { interval: 500 },
    parser: (value: any, index: number) => {
      NodeConfig.consumers.forEach((consumer) => {
        consumer.consume(value);
      })
    },
  },
];
