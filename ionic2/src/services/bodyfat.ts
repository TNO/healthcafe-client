import { Injectable } from '@angular/core';
import {GenericDatapointsService} from "./generic_datapoints";
import {StorageService} from "./storage";

@Injectable()
export class BodyFatService extends GenericDatapointsService {
  constructor(storageService: StorageService) {
    super(
      { namespace: 'omh', name: 'body-fat-percentage', version: '1.0' },
      (data: any): any => {
        if( !data.bodyfat ) {
          return null;
        }
        return { 'body_fat_percentage': { value: data.bodyfat, unit: '%' } };
      },
      storageService
    );
  }
}
