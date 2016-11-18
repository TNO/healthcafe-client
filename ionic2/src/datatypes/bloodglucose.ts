import {DataType} from "./datatype";
import {BloodGlucoseService} from "../services/bloodglucose";
import {Injectable} from "@angular/core";
import {CreateBloodGlucosePage} from "../pages/create/create";

@Injectable()
export class BloodGlucose implements DataType {
  public chartableProperties = 'blood-glucose';
  public chartOptions = {
    'measures': {
      'blood-glucose' : {
        'valueKeyPath': 'body.blood_glucose.value',
        'range': undefined,
        'units': 'mmol/L',
        'chart': {
          'pointFillColor' : '#4a90e2',
          'pointStrokeColor' : '#0066d6',
        },
        'thresholds': [
          { name: 'Desirable', max: 5.8 },
          { name: 'Borderline high', min: 5.8, max: 7.8 },
          { name: 'High', min: 7.8 },
        ]
      },
    }
  };

  constructor(public model: BloodGlucoseService) {}
}
