import {Component, ViewChild} from "@angular/core";
import {Platform, MenuController, Nav} from "ionic-angular";
import {IntroPage} from "../pages/intro/intro";
import {TimelinePage} from "../pages/timeline/timeline";
import {BloodGlucose} from "../datatypes/bloodglucose";
import {GenericChartPage} from "../pages/chart/chart";
import {BloodGlucoseService} from "../services/bloodglucose";
import {StorageService} from "../services/storage";

export interface PageObj {
  title: string;
  component: any;
  params?: any;
}

@Component({
  templateUrl: 'app.html',
  providers: [BloodGlucose, BloodGlucoseService, StorageService]
})
export class HealthcafeApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage = IntroPage;
  pages: PageObj[] = [];

  constructor(platform: Platform, menu: MenuController, bloodGlucose: BloodGlucose) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });

    this.pages = [
      { title: 'Intro', component: IntroPage },
      { title: 'Tijdlijn', component: TimelinePage },
      { title: 'Bloedglucose', component: GenericChartPage, params: { dataType: bloodGlucose } }
    ];
  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, page.params);
  }
}
