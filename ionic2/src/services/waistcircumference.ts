import { Injectable } from '@angular/core';
import {GenericDatapointsService} from "./generic_datapoints";
import {StorageService} from "./storage";

@Injectable()
export class WaistCircumferenceService extends GenericDatapointsService {
  constructor(storageService: StorageService) {
    super(
      { namespace: 'nrc', name: 'waist-circumference', version: '0.1' },
      (data: any): any => {
        if( !data.waist ) {
          return null;
        }
        return { 'waist_circumference': { value: data.waist, unit: 'm' } };
      },
      storageService
    );
  }
}
