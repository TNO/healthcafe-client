import { Injectable } from '@angular/core';
import {GenericDatapointsService} from "./generic_datapoints";
import {StorageService} from "./storage";

@Injectable()
export class BloodPressureService extends GenericDatapointsService {
  constructor(storageService: StorageService) {
    super(
      { namespace: 'omh', name: 'blood-pressure', version: '1.0' },
      (data: any): any => {
        if( !data.systolic || !data.diastolic ) {
          return null;
        }

        return {
          'systolic_blood_pressure': { value: data.systolic, unit: 'mmHg' },
          'diastolic_blood_pressure': { value: data.diastolic, unit: 'mmHg' },
        };
      },
      storageService
    );
  }
}
