import {Component} from "@angular/core";
import {DatapointUtil} from "../../services/datapointutil";

@Component({
  selector: 'info-bloodglucose',
  templateUrl: 'bloodglucose.html',
  providers: [DatapointUtil]
})
export class InfoBloodGlucosePage {
  constructor() {}
}

@Component({
  selector: 'info-bloodpressure',
  templateUrl: 'bloodpressure.html',
  providers: [DatapointUtil]
})
export class InfoBloodPressurePage {
  constructor() {}
}

@Component({
  selector: 'info-bmi',
  templateUrl: 'bmi.html',
  providers: [DatapointUtil]
})
export class InfoBmiPage {
  constructor() {}
}

@Component({
  selector: 'info-bodyfat',
  templateUrl: 'bodyfat.html',
  providers: [DatapointUtil]
})
export class InfoBodyFatPage {
  constructor() {}
}

@Component({
  selector: 'info-bodyweight',
  templateUrl: 'bodyweight.html',
  providers: [DatapointUtil]
})
export class InfoBodyWeightPage {
  constructor() {}
}

@Component({
  selector: 'info-cholesterol',
  templateUrl: 'cholesterol.html',
  providers: [DatapointUtil]
})
export class InfoCholesterolPage {
  constructor() {}
}

@Component({
  selector: 'info-waistcircumference',
  templateUrl: 'waistcircumference.html',
  providers: [DatapointUtil]
})
export class InfoWaistCircumferencePage {
  constructor() {}
}
