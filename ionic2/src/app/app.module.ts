import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {HealthcafeApp} from "./app.component";
import {IntroPage} from "../pages/intro/intro";
import {TimelinePage} from "../pages/timeline/timeline";
import {AddMenu} from "../pages/timeline/addmenu";
import {Timeline, TimelineEvent, TimelineBadge, TimelineHeading, TimelinePanel} from "../lib/angular-timeline";
import {
  DetailBloodGlucosePage,
  DetailWaistCircumferencePage,
  DetailCholesterolPage,
  DetailBodyWeightPage,
  DetailBodyFatPage,
  DetailBmiPage,
  DetailBloodPressurePage
} from "../pages/details/detail";
import {
  InfoBloodGlucosePage,
  InfoBloodPressurePage,
  InfoBmiPage,
  InfoBodyFatPage,
  InfoBodyWeightPage,
  InfoCholesterolPage,
  InfoWaistCircumferencePage
} from "../pages/info/info";
import {GenericChartPage} from "../pages/chart/chart";
import {OmhChart} from "../components/chart";
import {
  CreateWaistCircumferencePage, CreateCholesterolPage, CreateBodyWeightPage,
  CreateBodyFatPage, CreateBmiPage, CreateBloodPressurePage, CreateBloodGlucosePage
} from "../pages/create/create";

@NgModule({
  declarations: [
    HealthcafeApp,
    IntroPage,
    TimelinePage,
    AddMenu,

    GenericChartPage,

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

    CreateBloodGlucosePage,
    CreateBloodPressurePage,
    CreateBmiPage,
    CreateBodyFatPage,
    CreateBodyWeightPage,
    CreateCholesterolPage,
    CreateWaistCircumferencePage,

    Timeline,
    TimelineEvent,
    TimelineBadge,
    TimelineHeading,
    TimelinePanel,

    OmhChart
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

    GenericChartPage,

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

    CreateBloodGlucosePage,
    CreateBloodPressurePage,
    CreateBmiPage,
    CreateBodyFatPage,
    CreateBodyWeightPage,
    CreateCholesterolPage,
    CreateWaistCircumferencePage
  ],
  providers: []
})

export class AppModule {}
