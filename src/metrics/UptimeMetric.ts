export class UptimeMetric {
    constructor(private os: any) {
    }
  
    getCurrentValue() {
      return this.os.uptime();
    }
  }
  