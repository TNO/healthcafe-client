import { Injectable } from '@angular/core';
import {StorageService} from "./storage";
import {StaticDatapointsService} from "./static_datapoints";

@Injectable()
export class BodyHeightService extends StaticDatapointsService {
  constructor(storageService: StorageService) {
    super(
      { namespace: 'omh', name: 'body-height', version: '1.0' },
      (data: any): any => {
        if( !data.height ) {
          return null;
        }
        return { 'body_height': { value: data.height, unit: 'kg' } };
      },
      storageService
    );
  }
}
