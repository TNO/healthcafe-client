import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

@Component({
  templateUrl: 'addmenu.html'
})
export class AddMenu {
  constructor(public viewCtrl: ViewController) { }

  close() {
    this.viewCtrl.dismiss();
  }
}
