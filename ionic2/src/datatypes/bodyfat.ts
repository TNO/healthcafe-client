import {DataType} from "./datatype";
import {Injectable} from "@angular/core";
import {BodyFatService} from "../services/bodyfat";

@Injectable()
export class BodyFat implements DataType {
  public chartableProperties = 'body_fat_percentage';
  public chartOptions = {
    'measures': {
      'body_fat_percentage': {
        'valueKeyPath': 'body.body_fat_percentage.value',
        'range': undefined,
        'units': '%',
        'chart': {
          'pointFillColor' : '#4a90e2',
          'pointStrokeColor' : '#0066d6',
        },
      },
    }
  };

  constructor(public model: BodyFatService) {}
}
