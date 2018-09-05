export class CpuMetric {
  private cpuStart: any;

  constructor (private os: any) {
    this.resetCpu();
  }

  resetCpu() {
    this.cpuStart = this.os.cpus();
  }

  calculateCpuUsage(cpuCurrent: any) {
    let cpuUsage = cpuCurrent.reduce((prevCpu: any, cpu: any, index: number, cpus: any[]) => {
      return {
        cpuUsage: prevCpu.cpuUsage + ((1 - ((cpu.times.idle - this.cpuStart[index].times.idle) / (<any>Object).values(cpu.times).reduce((prev: number, curr: number, idx: number, arr: number[]) => {
          return prev + (curr - (<any>Object).values(this.cpuStart[index].times)[idx]);
        }, 0))) * 100) / cpus.length,
      };
    }, { cpuUsage: 0 });
    this.cpuStart = cpuCurrent;
    return cpuUsage;
  }

  getCurrentValue() {
    return this.calculateCpuUsage(this.os.cpus()).cpuUsage;
  }
}
