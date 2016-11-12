import {DataType} from "./datatype";
import {Injectable} from "@angular/core";
import {BodyWeightService} from "../services/bodyweight";

@Injectable()
export class BodyWeight implements DataType {
  public chartableProperties = 'body_weight';
  public chartOptions = {
    'measures': {
      'body_weight': {
        'range': undefined,
        'thresholds': undefined,  // Disable default threshold
      },
    }
  };

  constructor(public model: BodyWeightService) {}
}
