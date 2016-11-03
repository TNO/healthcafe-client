import { Injectable } from '@angular/core';
import {GenericDatapointsService} from "./generic_datapoints";
import {StorageService} from "./storage";

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
}
