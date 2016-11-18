import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {DatapointUtil} from "../../services/datapointutil";
import {GenderService} from "../../services/gender";
import {BmiService} from "../../services/bmi";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {BloodPressureService} from "../../services/bloodpressure";
import {CholesterolService} from "../../services/cholesterol";
import {WaistCircumferenceService} from "../../services/waistcircumference";
import {BloodGlucoseService} from "../../services/bloodglucose";

@Component({
  selector: 'pdas-feedback',
  templateUrl: 'feedback.html',
  providers: [DatapointUtil, GenderService, BmiService, BloodPressureService, CholesterolService, BloodGlucoseService, WaistCircumferenceService]
})
export class PdasFeedbackPage {
  public error;
  public feedback: any[] = [];
  public missing: any[] = [];
  public loading = true;

  constructor(public navCtrl: NavController, public datapointUtil: DatapointUtil, public http: Http,
              private gender: GenderService, private bmi: BmiService,
              private bloodPressure: BloodPressureService, private cholesterol: CholesterolService,
              private waistCircumference: WaistCircumferenceService, private bloodGlucose: BloodGlucoseService) {
    this.load();
  }

  private load() {
    let that = this;
    this.missing = [];

    // Use service locally
    let baseUri = 'http://msb2.hex.tno.nl/pdas/en/advices.json';
    let staticParams = '?snp.FTO=TT&generic.Age=45&physical.Physical+activity=120';
    var url = baseUri+staticParams;

    // Append a lot of data asynchronously, but wait until all promises have resolved
    // or rejected
    let promises = [];

    // Append gender, optionally
    promises.push(this.optional(
      this.gender
        .get()
        .then((data) => {
          console.debug("Gender found", data);
          url += '&generic.Gender='+data.body.gender;
        })
    ));

    promises.push(this.bmi.last()
      .then((datapoint) => {
        console.debug("BMI found", datapoint);
        url += '&physical.BMI='+datapoint.body.body_mass_index.value;
      }).catch(() => {
        console.debug("BMI not found");
        that.missing.push({name:'BMI', url:'bmi/add'});
      }));

    promises.push(this.bloodGlucose.lastFasting()
      .then((datapoint) => {
        console.debug("Fasting glucose found", datapoint);
        url += '&biomarker.Fasting+glucose='+datapoint.body.blood_glucose.value;
      }).catch(() => {
        console.debug("Fasting glucose not found");
        that.missing.push({name:'Fasting glucose', url:'bmi/add'});
      }));

    promises.push(this.waistCircumference.last()
      .then((datapoint) => {
        console.debug("Waist circumference found", datapoint);
        // The service requires waist circumference in cm
        if (datapoint.body.waist_circumference.unit == 'm') {
          url += '&physical.Waist+circumference=' + (+datapoint.body.waist_circumference.value * 100);
        }
        else {
          url += '&physical.Waist+circumference=' + datapoint.body.waist_circumference.value;
        }
      }).catch(() => {
        console.debug("Waist circumference not found");
        that.missing.push({name:'Waist circumference', url:'bmi/add'});
      }));


    promises.push(this.bloodPressure.last()
      .then((datapoint) => {
        console.debug("Blood pressure found", datapoint);
        url += '&biomarker.Systolic+blood+pressure='+datapoint.body.systolic_blood_pressure.value;
        url += '&biomarker.Diastolic+blood+pressure='+datapoint.body.diastolic_blood_pressure.value;
      }).catch(() => {
        console.debug("Blood pressure not found");
        that.missing.push({name:'Blood pressure', url:'bloodpressure/add'});
      }));

    promises.push(this.cholesterol.last()
      .then((datapoint) => {
        console.debug("Cholesterol found", datapoint);
        if(datapoint.body.blood_total_cholesterol)
          url += '&biomarker.Cholesterol=' + datapoint.body.blood_total_cholesterol.value;

        if(datapoint.body.blood_triglycerides)
          url += '&biomarker.Triglycerides='+datapoint.body.blood_triglycerides.value;

        if(datapoint.body.blood_ldl_cholesterol)
          url += '&biomarker.HDL='+datapoint.body.blood_ldl_cholesterol.value;
      }).catch((e) => {
        console.debug("Cholesterol not found");
        that.missing.push({name:'Cholesterol', url:'cholesterol/add'});
      }));


    // Only do something if all promises resolve
    return Promise.all(promises)
      .then(() => {
        console.debug("All promises finished");

        if(that.missing.length > 0) {
          console.debug( "Some data is missing");
          return;
        }

        // Nothing missing, do the call
        that.missing = [];

        let headers = new Headers({'Accept': 'application/hal+json','user_key': 'f24e20ecdb59062c31ca111d4c3cac0a'});
        let options = new RequestOptions({ headers: headers });

        console.debug("Perform http call", url, that.http);
        return that.http
          .get(url, options)
          .subscribe(response => {
            that.feedback = response.json();
          }, error => {
            that.feedback = [];
            that.error = "Could not reach PDAS, status: "+error.status;

            return Observable.throw(that.error);
          });
      });
  }

  private optional(callback: Promise<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      callback
        .then(resolve)
        .catch(resolve);
    });
  }
}
