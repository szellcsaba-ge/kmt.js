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
    new SocketIOConsumer(),
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
