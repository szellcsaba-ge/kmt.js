import {
  CpuMetricWatcher,
} from './Watchers';

import {
  ConsoleConsumer,
  LogConsumer,
  SocketIOConsumer,
} from './Consumers';

export const NodeConfig = {
  nodeName: 'nb',
  consumers: [
    new ConsoleConsumer(),
    new LogConsumer('logs'),
    new SocketIOConsumer({ port: 8012, interval: 2000 }),
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
