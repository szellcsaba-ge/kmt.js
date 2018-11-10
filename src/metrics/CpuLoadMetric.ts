export class CpuLoadMetric {
  constructor(private fs: any) {
  }

  getCurrentValue() {
    if (process.platform !== 'win32') {
      var contents = this.fs.readFileSync('/proc/loadavg');
      return contents.toString('UTF-8').split(' ')[0];
    } else {
      return 0;
    }
  }
}
