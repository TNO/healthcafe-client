import {Component, ViewChild} from "@angular/core";
import {Platform, MenuController, Nav} from "ionic-angular";
import {IntroPage} from "../pages/intro/intro";
import {TimelinePage} from "../pages/timeline/timeline";
import {BloodGlucose} from "../datatypes/bloodglucose";
import {ChartPage} from "../pages/chart/chart";
import {BloodGlucoseService} from "../services/bloodglucose";
import {StorageService} from "../services/storage";
import {BodyWeight} from "../datatypes/bodyweight";
import {Cholesterol} from "../datatypes/cholesterol";
import {BodyWeightService} from "../services/bodyweight";
import {CholesterolService} from "../services/cholesterol";
import {QuestionnaireOverviewPage} from "../pages/questionnaire/overview/questionnaire";
import {Vita16} from "../questionnairetypes/vita16";

export interface PageObj {
  title: string;
  component: any;
  params?: any;
}

export interface MenuStructure {
  pages: PageObj[],
  charts: PageObj[],
  questionnaires: PageObj[]
}

@Component({
  templateUrl: 'app.html',
  providers: [
    BloodGlucose, BloodGlucoseService,
    BodyWeight, BodyWeightService,
    Cholesterol, CholesterolService,
    Vita16,
    StorageService]
})
export class HealthcafeApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage = IntroPage;
  menu: MenuStructure = { pages: [], charts: [], questionnaires: [] };

  constructor(platform: Platform, menu: MenuController, bloodGlucose: BloodGlucose, bodyWeight: BodyWeight, cholesterol: Cholesterol, vita16: Vita16) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });


    this.menu.pages = [
      {title: 'Intro', component: IntroPage},
      {title: 'Tijdlijn', component: TimelinePage},
    ];

    this.menu.charts = [
      {title: 'Bloedglucose', component: ChartPage, params: {dataType: bloodGlucose}},
      {title: 'Cholesterol', component: ChartPage, params: {dataType: cholesterol}},
      {title: 'Gewicht', component: ChartPage, params: {dataType: bodyWeight}}
    ];

    this.menu.questionnaires = [
      {title: 'Vita16', component: QuestionnaireOverviewPage, params: {questionnaireType: vita16}},
    ];

  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, page.params);
  }
}
