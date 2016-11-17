import { Injectable } from '@angular/core';
import {GenericDatapointsService, Datapoint} from "./generic_datapoints";
import {StorageService} from "./storage";
import {DatapointUtil} from "./datapointutil";

@Injectable()
export class BloodGlucoseService extends GenericDatapointsService {
  constructor(storageService: StorageService) {
    super(
      { namespace: 'omh', name: 'blood-glucose', version: '1.0' },
      (data: any): any => {
        if( !data.level ) {
          return null;
        }

        return {
          'blood_glucose': { value: data.level, unit: 'mmol/L' },
          'temporal_relationship_to_meal': data.relationship_to_meal ? data.relationship_to_meal.name : ""
        };
      },
      storageService
    );
  }

  public lastFasting() {
    return new Promise<Datapoint>((resolve, reject) => {
      this.list()
        .then((datapoints) => {
          if(datapoints.length > 0) {
            let sorted = new DatapointUtil().sortByDate(datapoints);
            for(let datapoint of sorted) {
              if(datapoint.body.temporal_relationship_to_meal == 'fasting') {
                resolve(datapoint);
                return;
              }
            }
          }

          reject('No fasting glucose found');
        })
        .catch((e) => {
          reject(e);
        })
    });
  }

}
