import {
  CpuMetricWatcher,
} from './Watchers';

import {
  ConsoleConsumer,
} from './Consumers';

export const NodeConfig = {
  nodeName: 'nb',
  consumers: [
    new ConsoleConsumer()
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