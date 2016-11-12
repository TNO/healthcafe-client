import {DataType} from "./datatype";
import {Injectable} from "@angular/core";
import {BmiService} from "../services/bmi";

@Injectable()
export class BodyMassIndex implements DataType {
  public chartableProperties = 'body-mass-index';
  public chartOptions = {
    'measures': {
      'body-mass-index' : {
        'valueKeyPath': 'body.body_mass_index.value',
        'range': undefined,
        'units': 'kg/m2',
        'thresholds': { 'min': 18, 'max': 25  },
      },
    }
  };

  constructor(public model: BmiService) {}
}
