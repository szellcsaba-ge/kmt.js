import { DriveList } from "drivelist";
import { DiskUsage } from "diskusage";
import { MetricValue } from "@models/MetricValue";

export class DiskFreeMetric {
  public metricArray: any;

  constructor(private driveList: any, private diskUsage: any) {
    this.metricArray = [];
  }

  getCurrentValue() {
    this.driveList.list((error: Error, drives: DriveList[]) => {
      if (error) {
        throw error;
      }

      drives.forEach(drive => {
        drive.mountpoints.forEach(mountPoint => {
          this.diskUsage.check(mountPoint.path, (err: Error, info: DiskUsage) => {
            if (error) {
              throw error;
            } else {
              if (info) {
                this.metricArray[mountPoint.path] = info.available / info.total;
              }
            }
          });
        })
      });
    });

    const result = Object.keys(this.metricArray).map(mount => {
      return new MetricValue(mount, this.metricArray[mount]);
    });

    this.metricArray = [];

    return result;
  }
}
