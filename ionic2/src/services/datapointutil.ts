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

  sortByDate(datapoints: Datapoint[]) {
    let self = this;
    return datapoints.sort((a,b) => {
      return self.getDate(a).valueOf() - self.getDate(b).valueOf();
    });
  }

  static convertDates(datapoint: Datapoint, conversionMethod: (date:any)=>(Date)) {
    if(datapoint.header && datapoint.header.creation_date_time)
      datapoint.header.creation_date_time = conversionMethod(datapoint.header.creation_date_time);

    if(datapoint.header && datapoint.header.acquisition_provenance && datapoint.header.acquisition_provenance.source_creation_date_time)
      datapoint.header.acquisition_provenance.source_creation_date_time = conversionMethod(datapoint.header.acquisition_provenance.source_creation_date_time);

    if( datapoint.body && datapoint.body.effective_time_frame && datapoint.body.effective_time_frame.date_time)
      datapoint.body.effective_time_frame.date_time = conversionMethod(datapoint.body.effective_time_frame.date_time);

    return datapoint;
  }
}
