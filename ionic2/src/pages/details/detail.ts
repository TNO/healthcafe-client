import {Component} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {Datapoint} from "../../services/generic_datapoints";
import {DatapointUtil} from "../../services/datapointutil";
import {
  InfoBloodGlucosePage, InfoWaistCircumferencePage, InfoCholesterolPage,
  InfoBodyWeightPage, InfoBodyFatPage, InfoBmiPage, InfoBloodPressurePage
} from "../info/info";

export abstract class GenericDetailPage {
  public datapoint: Datapoint
  public date: Date;

  constructor(public infoPage: any, public navCtrl: NavController, navParams: NavParams, datapointUtil: DatapointUtil) {
    this.datapoint = navParams.get('datapoint');
    this.date = datapointUtil.getDate(this.datapoint);
  }

  showInfo(event: any) {
    event.preventDefault();
    this.navCtrl.push(this.infoPage);
  }
}


@Component({
  selector: 'detail-bloodglucose',
  templateUrl: 'bloodglucose.html',
  providers: [DatapointUtil]
})
export class DetailBloodGlucosePage extends GenericDetailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, datapointUtil: DatapointUtil) {
    super(InfoBloodGlucosePage, navCtrl, navParams, datapointUtil);
  }
}

@Component({
  selector: 'detail-bloodpressure',
  templateUrl: 'bloodpressure.html',
  providers: [DatapointUtil]
})
export class DetailBloodPressurePage extends GenericDetailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, datapointUtil: DatapointUtil) {
    super(InfoBloodPressurePage, navCtrl, navParams, datapointUtil);
  }
}


@Component({
  selector: 'detail-bmi',
  templateUrl: 'bmi.html',
  providers: [DatapointUtil]
})
export class DetailBmiPage extends GenericDetailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, datapointUtil: DatapointUtil) {
    super(InfoBmiPage, navCtrl, navParams, datapointUtil);
  }
}


@Component({
  selector: 'detail-bodyfat',
  templateUrl: 'bodyfat.html',
  providers: [DatapointUtil]
})
export class DetailBodyFatPage extends GenericDetailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, datapointUtil: DatapointUtil) {
    super(InfoBodyFatPage, navCtrl, navParams, datapointUtil);
  }
}


@Component({
  selector: 'detail-bodyweight',
  templateUrl: 'bodyweight.html',
  providers: [DatapointUtil]
})
export class DetailBodyWeightPage extends GenericDetailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, datapointUtil: DatapointUtil) {
    super(InfoBodyWeightPage, navCtrl, navParams, datapointUtil);
  }
}


@Component({
  selector: 'detail-cholesterol',
  templateUrl: 'cholesterol.html',
  providers: [DatapointUtil]
})
export class DetailCholesterolPage extends GenericDetailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, datapointUtil: DatapointUtil) {
    super(InfoCholesterolPage, navCtrl, navParams, datapointUtil);
  }
}


@Component({
  selector: 'detail-waistcircumference',
  templateUrl: 'waistcircumference.html',
  providers: [DatapointUtil]
})
export class DetailWaistCircumferencePage extends GenericDetailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, datapointUtil: DatapointUtil) {
    super(InfoWaistCircumferencePage, navCtrl, navParams, datapointUtil);
  }
}

