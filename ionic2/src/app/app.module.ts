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
import {Timeline, TimelineEvent, TimelineBadge, TimelineHeading, TimelinePanel} from "../providers/angular-timeline";

@NgModule({
  declarations: [
    HealthcafeApp,
    IntroPage,
    TimelinePage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddMenu,
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
    ContactPage,
    HomePage,
    TabsPage,
    AddMenu
  ],
  providers: []
})

export class AppModule {}
