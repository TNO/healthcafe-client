import {Component} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";
import {DatapointUtil} from "../../services/datapointutil";
import {StorageService} from "../../services/storage";
import {DataType} from "../../datatypes/datatype";
import {InfoBloodGlucosePage} from "../datatype_info/info";

@Component({
  selector: 'chart-page',
  templateUrl: 'chart.html',
  providers: [DatapointUtil, StorageService]
})
export class GenericChartPage {
  public loading = true;
  public datapoints = [];
  public dataType: DataType;

  constructor(public navCtrl: NavController, navParams: NavParams, datapointUtil: DatapointUtil) {
    this.dataType = navParams.get('dataType');

    this.dataType.model.list().then((datapoints) => {
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
    this.navCtrl.push(InfoBloodGlucosePage);
  }
}
