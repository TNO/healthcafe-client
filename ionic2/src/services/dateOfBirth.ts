import { Injectable } from '@angular/core';
import {StorageService} from "./storage";
import {StaticDatapointsService} from "./static_datapoints";

@Injectable()
export class DateOfBirthService extends StaticDatapointsService {
  constructor(storageService: StorageService) {
    super(
      { namespace: 'nrc', name: 'date-of-birth', version: '0.1' },
      (data: any): any => {
        if( !data.dob ) {
          return null;
        }
        return { 'date_of_birth': data.dob };
      },
      storageService
    );
  }
}
