export class CpuLoadMetric {
  constructor(private fs: any) {
  }

  getCurrentValue() {

var contents = this.fs.readFileSync('/proc/loadavg');
   
return contents.toString('UTF-8').split(' ')[0];
}
}
