import {BloodPressureService} from "../services/bloodpressure";
import {DataType} from "./datatype";
import {Injectable} from "@angular/core";

@Injectable()
export class BloodPressure implements DataType {
  public chartableProperties = 'systolic_blood_pressure, diastolic_blood_pressure';
  public chartOptions = {
    'userInterface': {
      'tooltips': {
        'contentFormatter': function(d) {
          var systolic = d.omhDatum.body.systolic_blood_pressure.value.toFixed( 0 );
          var diastolic = d.omhDatum.body.diastolic_blood_pressure.value.toFixed( 0 );
          return systolic + '/' + diastolic;
        }
      }
    }
  };

  constructor(public model: BloodPressureService) {}
}
