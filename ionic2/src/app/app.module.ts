import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HealthcafeApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {IntroPage} from "../pages/intro/intro";
import {TimelinePage} from "../pages/timeline/timeline";
import {AddMenu} from "../pages/timeline/addmenu";
import {Timeline, TimelineEvent, TimelineBadge, TimelineHeading, TimelinePanel} from "../lib/angular-timeline";
import {
  DetailBloodGlucosePage, DetailWaistCircumferencePage, DetailCholesterolPage,
  DetailBodyWeightPage, DetailBodyFatPage, DetailBmiPage, DetailBloodPressurePage
} from "../pages/details/detail";
import {
  InfoBloodGlucosePage, InfoBloodPressurePage, InfoBmiPage, InfoBodyFatPage,
  InfoBodyWeightPage, InfoCholesterolPage, InfoWaistCircumferencePage
} from "../pages/datatype_info/info";

@NgModule({
  declarations: [
    HealthcafeApp,
    IntroPage,
    TimelinePage,
    AddMenu,

    DetailBloodGlucosePage,
    DetailBloodPressurePage,
    DetailBmiPage,
    DetailBodyFatPage,
    DetailBodyWeightPage,
    DetailCholesterolPage,
    DetailWaistCircumferencePage,

    InfoBloodGlucosePage,
    InfoBloodPressurePage,
    InfoBmiPage,
    InfoBodyFatPage,
    InfoBodyWeightPage,
    InfoCholesterolPage,
    InfoWaistCircumferencePage,

    Timeline,
    TimelineEvent,
    TimelineBadge,
    TimelineHeading,
    TimelinePanel
  ],
  imports: [
    IonicModule.forRoot(HealthcafeApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HealthcafeApp,
    IntroPage,
    TimelinePage,
    AddMenu,

    DetailBloodGlucosePage,
    DetailBloodPressurePage,
    DetailBmiPage,
    DetailBodyFatPage,
    DetailBodyWeightPage,
    DetailCholesterolPage,
    DetailWaistCircumferencePage,

    InfoBloodGlucosePage,
    InfoBloodPressurePage,
    InfoBmiPage,
    InfoBodyFatPage,
    InfoBodyWeightPage,
    InfoCholesterolPage,
    InfoWaistCircumferencePage
  ],
  providers: []
})

export class AppModule {}
