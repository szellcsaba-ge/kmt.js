export class MemoryMetric {
  constructor(private os: any) {
  }

  getCurrentValue() {
    return this.os.freemem() / this.os.totalmem();
  }
}
