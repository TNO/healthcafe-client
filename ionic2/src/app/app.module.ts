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
} from "../pages/datatype_info/info";
import {GenericChartPage} from "../pages/chart/chart";
import {OmhChart} from "../components/chart";

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
    InfoWaistCircumferencePage
  ],
  providers: []
})

export class AppModule {}
