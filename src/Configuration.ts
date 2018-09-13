import * as os from 'os';

import {
  CpuMetricWatcher,
} from '@watchers/Watchers';

import {
  ConsoleConsumer,
  LogConsumer,
  SocketIOConsumer,
  BufferConsumer,
} from '@consumers/Consumers';

export const NodeConfig = {
  nodeName: os.hostname,
  consumers: [
    new ConsoleConsumer(),
    new LogConsumer('logs'),
    new SocketIOConsumer(),
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
];
