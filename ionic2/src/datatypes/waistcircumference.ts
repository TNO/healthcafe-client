import {DataType} from "./datatype";
import {Injectable} from "@angular/core";
import {WaistCircumferenceService} from "../services/waistcircumference";

@Injectable()
export class WaistCircumference implements DataType {
  public chartableProperties = 'waist_circumference';
  public chartOptions = {
    'measures': {
      'waist_circumference': {
        'valueKeyPath': 'body.waist_circumference.value',
        'range': undefined,
        'units': 'm',
        'chart': {
          'pointFillColor' : '#4a90e2',
          'pointStrokeColor' : '#0066d6',
        },
      },
    }
  };

  constructor(public model: WaistCircumferenceService) {}
}
