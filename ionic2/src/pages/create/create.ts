import {BloodGlucose} from "../../datatypes/bloodglucose";
import {BloodPressure} from "../../datatypes/bloodpressure";
import {BodyMassIndex} from "../../datatypes/bmi";
import {BodyFat} from "../../datatypes/bodyfat";
import {BodyWeight} from "../../datatypes/bodyweight";
import {Cholesterol} from "../../datatypes/cholesterol";
import {WaistCircumference} from "../../datatypes/waistcircumference";
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {DatapointUtil} from "../../services/datapointutil";
import {DataType} from "../../datatypes/datatype";
import {TimelinePage} from "../timeline/timeline";
import {BloodGlucoseService} from "../../services/bloodglucose";
import {BloodPressureService} from "../../services/bloodpressure";
import {BmiService} from "../../services/bmi";
import {StorageService} from "../../services/storage";

export abstract class GenericCreatePage {
  public data: any;
  public date: Date;

  constructor(public dataType: DataType, public navCtrl: NavController) {
    this.data = (typeof dataType.defaults != 'undefined') ? dataType.defaults : {};
    this.date = new Date();
  }

  save() {
    event.preventDefault();

    var that = this;

    console.log("Ssaving", this.data, this.date);
    this.dataType.model.create(this.data, this.date)
      .then(function(data) {
        that.dataType.model.load().then(function() {
          if(that.navCtrl.canGoBack()) {
            that.navCtrl.pop();
          } else {
            that.navCtrl.setRoot(TimelinePage);
          }
        });
      })
      .catch(function(e) {
        console.log( "Error saving data: ", e );
      });
  }

  set bindableDate(value: String){
    let parts = value.split('-');
    let d = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
    this.date.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1);
  }

  get bindableDate(){
    return this.date.toISOString().substring(0, 10);
  }
}

@Component({
  selector: 'create-bloodglucose',
  templateUrl: 'bloodglucose.html',
  providers: [BloodGlucose, BloodGlucoseService, StorageService]
})
export class CreateBloodGlucosePage extends GenericCreatePage {
  constructor(dataType: BloodGlucose, navCtrl: NavController) {
    super(dataType, navCtrl);
  }
}


@Component({
  selector: 'create-bloodpressure',
  templateUrl: 'todo.html',
  providers: [BloodPressure, BloodPressureService, StorageService]
})
export class CreateBloodPressurePage extends GenericCreatePage {
  constructor(public dataType: BloodPressure, public navCtrl: NavController) {
    super(dataType, navCtrl);
  }
}


@Component({
  selector: 'create-bmi',
  templateUrl: 'todo.html',
  providers: [BodyMassIndex, BmiService, StorageService]
})
export class CreateBmiPage extends GenericCreatePage {
  constructor(public dataType: BodyMassIndex, public navCtrl: NavController) {
    super(dataType, navCtrl);
  }
}


@Component({
  selector: 'create-bodyfat',
  templateUrl: 'todo.html',
  providers: [DatapointUtil]
})
export class CreateBodyFatPage extends GenericCreatePage {
  constructor(public dataType: BodyFat, public navCtrl: NavController) {
    super(dataType, navCtrl);
  }
}


@Component({
  selector: 'create-bodyweight',
  templateUrl: 'todo.html',
  providers: [DatapointUtil]
})
export class CreateBodyWeightPage extends GenericCreatePage {
  constructor(public dataType: BodyWeight, public navCtrl: NavController) {
    super(dataType, navCtrl);
  }
}


@Component({
  selector: 'create-cholesterol',
  templateUrl: 'todo.html',
  providers: [DatapointUtil]
})
export class CreateCholesterolPage extends GenericCreatePage {
  constructor(public dataType: Cholesterol, public navCtrl: NavController) {
    super(dataType, navCtrl);
  }
}


@Component({
  selector: 'create-waistcircumference',
  templateUrl: 'todo.html',
  providers: [DatapointUtil]
})
export class CreateWaistCircumferencePage extends GenericCreatePage {
  constructor(public dataType: WaistCircumference, public navCtrl: NavController) {
    super(dataType, navCtrl);
  }
}

