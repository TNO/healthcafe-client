import { Injectable } from '@angular/core';
import {GenericDatapointsService} from "./generic_datapoints";
import {StorageService} from "./storage";

@Injectable()
export class BodyWeightService extends GenericDatapointsService {
  constructor(storageService: StorageService) {
    super(
      { namespace: 'omh', name: 'body-weight', version: '1.0' },
      (data: any): any => {
        if( !data.weight ) {
          return null;
        }
        return { 'body_weight': { value: data.weight, unit: 'kg' } };
      },
      storageService
    );
  }
}
