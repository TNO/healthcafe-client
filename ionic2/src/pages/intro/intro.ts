import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TimelinePage} from "../timeline/timeline";
import {BodyHeightService} from "../../services/bodyheight";
import {GenderService} from "../../services/gender";
import {DateOfBirthService} from "../../services/dateOfBirth";
import {StorageService} from "../../services/storage";

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
  providers: [BodyHeightService, GenderService, DateOfBirthService, StorageService]
})
export class IntroPage {
  public personalDataRequired = true;

  constructor(public navCtrl: NavController, bodyHeight: BodyHeightService, gender: GenderService, dob: DateOfBirthService) {
    let self = this;

    // If either bodyheight, gender or dateofbirth is given, set the
    // flag personaldata to false
    Promise.race([bodyHeight.get(), gender.get(), dob.get()]).then(() => {
      self.personalDataRequired = false;
    })
  }

  public goToTimeline() {
    this.navCtrl.push(TimelinePage, {});
  }

  public goToPersonalData() {
    this.navCtrl.push(TimelinePage, {});
  }

}
