import {Component} from "@angular/core";
import {DatapointUtil} from "../../services/datapointutil";

export class GenericInfoPage {}

@Component({
  selector: 'info-bloodglucose',
  templateUrl: 'bloodglucose.html',
  providers: [DatapointUtil]
})
export class InfoBloodGlucosePage extends GenericInfoPage {}

@Component({
  selector: 'info-bloodpressure',
  templateUrl: 'bloodpressure.html',
  providers: [DatapointUtil]
})
export class InfoBloodPressurePage extends GenericInfoPage {}

@Component({
  selector: 'info-bmi',
  templateUrl: 'bmi.html',
  providers: [DatapointUtil]
})
export class InfoBmiPage extends GenericInfoPage {}

@Component({
  selector: 'info-bodyfat',
  templateUrl: 'bodyfat.html',
  providers: [DatapointUtil]
})
export class InfoBodyFatPage extends GenericInfoPage {}

@Component({
  selector: 'info-bodyweight',
  templateUrl: 'bodyweight.html',
  providers: [DatapointUtil]
})
export class InfoBodyWeightPage extends GenericInfoPage {}

@Component({
  selector: 'info-cholesterol',
  templateUrl: 'cholesterol.html',
  providers: [DatapointUtil]
})
export class InfoCholesterolPage extends GenericInfoPage {}

@Component({
  selector: 'info-waistcircumference',
  templateUrl: 'waistcircumference.html',
  providers: [DatapointUtil]
})
export class InfoWaistCircumferencePage extends GenericInfoPage {}
