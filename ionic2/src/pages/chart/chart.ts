import {Component} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";
import {GenericDatapointsService} from "../../services/generic_datapoints";
import {DatapointUtil} from "../../services/datapointutil";
import {InfoBloodGlucosePage} from "../datatype_info/info";
import {BloodGlucoseService} from "../../services/bloodglucose";
import {StorageService} from "../../services/storage";

abstract class GenericChartPage {
  public loading = true;
  public datapoints = [];

  constructor(public infoPage: any, public model: GenericDatapointsService, public navCtrl: NavController, navParams: NavParams, datapointUtil: DatapointUtil) {
    //this.datapoint = navParams.get('datapoint');

    model.list().then((datapoints) => {
      console.log("loaded datapoints", datapoints);
      this.loading = false;
      this.datapoints = datapoints;
    }).catch(() => {
      this.loading = false;
      this.datapoints = [];
    })
  }

  showInfo(event: any) {
    event.preventDefault();
    this.navCtrl.push(this.infoPage);
  }
}


@Component({
  selector: 'detail-bloodglucose',
  templateUrl: 'bloodglucose.html',
  providers: [DatapointUtil, BloodGlucoseService, StorageService]
})
export class ChartBloodGlucosePage extends GenericChartPage {
  constructor(public navCtrl: NavController, public model: BloodGlucoseService, public navParams: NavParams, datapointUtil: DatapointUtil) {
    super(InfoBloodGlucosePage, model, navCtrl, navParams, datapointUtil);
  }
}
