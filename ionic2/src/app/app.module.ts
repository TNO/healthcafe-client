import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HealthcafeApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {IntroPage} from "../pages/intro/intro";

@NgModule({
  declarations: [
    HealthcafeApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IntroPage
  ],
  imports: [
    IonicModule.forRoot(HealthcafeApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HealthcafeApp,
    IntroPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: []
})
export class AppModule {}
