import {
  CpuMetricWatcher,
} from './Watchers';

import {
  ConsoleConsumer,
  LogConsumer,
} from './Consumers';

export const NodeConfig = {
  nodeName: 'nb',
  consumers: [
    new ConsoleConsumer(),
    new LogConsumer('logs'),
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
