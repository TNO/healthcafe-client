import {Injectable} from "@angular/core";
import {Datapoint} from "./generic_datapoints";

@Injectable()
export class DatapointUtil  {
  constructor() {}

  getDate(dataPoint: Datapoint): Date {
    if( dataPoint.body.effective_time_frame && dataPoint.body.effective_time_frame.date_time ) {
      return dataPoint.body.effective_time_frame.date_time;
    } else {
      return dataPoint.header.creation_date_time;
    }
  }
}
