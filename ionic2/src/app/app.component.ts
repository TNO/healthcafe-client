import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';

import { IntroPage } from '../pages/intro/intro';
import {TimelinePage} from "../pages/timeline/timeline";

export interface PageObj {
  title: string;
  component: any;
  icon?: string;
}

@Component({
  templateUrl: 'app.html'
})
export class HealthcafeApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage = IntroPage;
  pages: PageObj[] = [
    { title: 'Intro', component: IntroPage },
    { title: 'Tijdlijn', component: TimelinePage }
  ];

  constructor(platform: Platform, menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
