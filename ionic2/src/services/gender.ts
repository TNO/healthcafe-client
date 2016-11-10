import { Injectable } from '@angular/core';
import {StorageService} from "./storage";
import {StaticDatapointsService} from "./static_datapoints";

@Injectable()
export class GenderService extends StaticDatapointsService {
  constructor(storageService: StorageService) {
    super(
      { namespace: 'nrc', name: 'gender', version: '0.1' },
      (data: any): any => {
        if( !data.gender ) {
          return null;
        }
        return { 'gender': data.gender };
      },
      storageService
    );
  }
}
