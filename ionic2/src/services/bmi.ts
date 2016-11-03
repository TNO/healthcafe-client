import { Injectable } from '@angular/core';
import {GenericDatapointsService} from "./generic_datapoints";
import {StorageService} from "./storage";

@Injectable()
export class BmiService extends GenericDatapointsService {
  constructor(storageService: StorageService) {
    super(
      { namespace: 'omh', name: 'body-mass-index', version: '1.0' },
      (data: any): any => {
        if( !data.weight || !data.height ) {
          return null;
        }
        return {
          'body_mass_index': { value: data.weight / ( data.height * data.height ), unit: 'kg/m2' },
        };
      },
      storageService
    );
  }
}
