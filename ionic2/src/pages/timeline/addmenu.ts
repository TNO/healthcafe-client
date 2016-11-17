import {Component} from "@angular/core";
import {ViewController, NavController} from "ionic-angular";
import {DataType} from "../../datatypes/datatype";
import {CreateBloodGlucosePage} from "../create/create";

@Component({
  templateUrl: 'addmenu.html'
})
export class AddMenu {
  public bloodGlucoseCreatePage = CreateBloodGlucosePage;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController) { }

  create(createPage: any) {
    this.navCtrl.push(createPage);
    this.viewCtrl.dismiss();
  }
}
