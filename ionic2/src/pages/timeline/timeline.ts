import {Component, Inject} from "@angular/core";
import {PopoverController} from "ionic-angular";
import {AddMenu} from "./addmenu";
import {BloodGlucoseService} from "../../services/bloodglucose";
import {GenericDatapointsService} from "../../services/generic_datapoints";
import {StorageService} from "../../services/storage";

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
  providers: [BloodGlucoseService, StorageService]
})
export class TimelinePage {
  public loading: boolean = false
  public events: any = [];
  public models: any = [];

  private definitions: Object = {};

  constructor(public popoverCtrl: PopoverController, bloodGlucose: BloodGlucoseService) {
    this.addModel('blood-glucose', bloodGlucose, 'ion-fork')
    this.load();

    // {
    //   'blood-glucose': { icon: 'ion-fork', model: bloodGlucose},
    //   'blood-pressure': { icon: 'ion-heart', model: BloodPressure },
    //   'body-mass-index': { icon: 'ion-ios-flame', model: BMI},
    //   'body-fat-percentage': { icon: 'ion-pie-graph', model: BodyFat},
    //   'body-weight': { icon: 'ion-speedometer', model: BodyWeight},
    //   'cholesterol': { icon: 'ion-waterdrop', model: Cholesterol},
    //   'waist-circumference': { icon: 'ion-ios-circle-outline', model: WaistCircumference},
    // };
  }

  private addModel(id: string, service: GenericDatapointsService, icon: string) {
    this.models.push(service);
    this.definitions[id] = { icon: icon, model: service}
  }


  load() {
    this.loading = true;
    this.events = []
    let that = this;
    Promise.all( that.models.map(function(model) { return model.list() } ) ).then(function(data) {
      that.events = that.combine(data);
    }).then(function() {
      that.loading = false;
    }).catch(function(e) {
      console.log("Error in retrieving data from model: ", e);
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(AddMenu);
    popover.present({ ev: event });
  }

  /**
   * Combines datapoints and inverventions into a single list
   * @param data  List with lists of datapoints or remarks
   */
  private combine(data: any) {
    let that = this;
    let events = this.flatten(
      data.map(function(entries) {
        return entries.map(function(element) {
          // Convert each element into the proper format
          // See convertDatapoint and convertIntervention for details
          if( element.header && element.body ) {
            return that.convertDatapoint(element);
          } else {
            return that.convertIntervention(element)
          }
        });
      })
    );

    // Sort by date descending
    return events.sort((a,b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }


  /**
   * Converts a blood pressure datapoint into an event on the timeline
   */
  private convertDatapoint(dataPoint: any) {
    let date = null;
    if( dataPoint.body.effective_time_frame && dataPoint.body.effective_time_frame.date_time ) {
      date = dataPoint.body.effective_time_frame.date_time;
    } else {
      date = dataPoint.header.creation_date_time;
    }

    var schemaName = dataPoint.header.schema_id.name;

    return {
      id: dataPoint.header.id,
      datapoint: dataPoint,
      date: date,
      badgeIconClass: this.definitions[schemaName].icon,
      badgeClass: dataPoint.header.schema_id.name,
      type: 'measurement',
      measurementType: schemaName,
      model: this.definitions[schemaName].model,
      showDetail: function() {
        var typeName;
        switch(schemaName) {
          case 'body-mass-index':     typeName = 'bmi'; break;
          case 'body-fat-percentage': typeName = 'bodyfat'; break;
          default:                    typeName = schemaName.replace( /-/g, '' ); break;
        }

        // TODO: Go to detail page for this measurement
        // $state.go( 'app.' +  typeName + '_measurement', { measurementId: dataPoint.header.id } );
      }
    };
  }

  /**
   * Converts an intervention into an event on the timeline
   */
  private convertIntervention(intervention: any): any {
    // TODO: Implement
    // return Object.assign({}, intervention, {
    //   badgeIconClass: 'ion-flash',
    //   badgeClass: 'remark',
    //   type: 'intervention',
    //   model: Remarks,
    //   showDetail: function() { return false; }
    // });
    return {};
  }

  private flatten(arrays: any[]): any[] {
    return [].concat.apply([], arrays);
  }

}


// (function() {
// 	angular.module('healthcafe.timeline')
// 		.controller('TimelineController', TimelineController );
//
// 		TimelineController.$inject = [ 'BloodGlucose', 'BloodPressure', 'BMI', 'BodyFat', 'BodyWeight', 'Cholesterol', 'WaistCircumference', 'Remarks', '$q', '$ionicPopover', '$timeout', '$state'];
//
// 		function TimelineController(BloodGlucose, BloodPressure, BMI, BodyFat, BodyWeight, Cholesterol, WaistCircumference, Remarks, $q, $ionicPopover, $timeout, $state) {
//       var vm = this;
//
//       var definitions = {
//         'blood-glucose': { icon: 'ion-fork', model: BloodGlucose},
//         'blood-pressure': { icon: 'ion-heart', model: BloodPressure },
//         'body-mass-index': { icon: 'ion-ios-flame', model: BMI},
//         'body-fat-percentage': { icon: 'ion-pie-graph', model: BodyFat},
//         'body-weight': { icon: 'ion-speedometer', model: BodyWeight},
//         'cholesterol': { icon: 'ion-waterdrop', model: Cholesterol},
//         'waist-circumference': { icon: 'ion-ios-circle-outline', model: WaistCircumference},
//       };
//
//       /**
//        * Converts a blood pressure datapoint into an event on the timeline
//        */
//       function convertDatapoint(dataPoint) {
//         if( dataPoint.body.effective_time_frame && dataPoint.body.effective_time_frame.date_time ) {
//           date = dataPoint.body.effective_time_frame.date_time;
//         } else {
//           date = dataPoint.header.creation_date_time;
//         }
//
//         var schemaName = dataPoint.header.schema_id.name;
//
//         return {
//           id: dataPoint.header.id,
//           datapoint: dataPoint,
//           date: date,
//           badgeIconClass: definitions[schemaName].icon,
//           badgeClass: dataPoint.header.schema_id.name,
//           type: 'measurement',
//           measurementType: schemaName,
//           model: definitions[schemaName].model,
//           showDetail: function() {
//             var typeName;
//             switch(schemaName) {
//               case 'body-mass-index':     typeName = 'bmi'; break;
//               case 'body-fat-percentage': typeName = 'bodyfat'; break;
//               default:                    typeName = schemaName.replace( /-/g, '' ); break;
//             }
//             $state.go( 'app.' +  typeName + '_measurement', { measurementId: dataPoint.header.id } );
//           }
//         };
//       }
//
//       /**
//        * Converts an intervention into an event on the timeline
//        */
//       function convertIntervention(intervention) {
//         return angular.extend({}, intervention, {
//           badgeIconClass: 'ion-flash',
//           badgeClass: 'remark',
//           type: 'intervention',
//           model: Remarks,
//           showDetail: function() { return false; }
//         });
//       }
//
//       /**
//        * Combines datapoints and inverventions into a single list
//        * @param data  List with lists of datapoints or remarks
//        */
//       function combine( data ) {
//         var events = flatten(
//           data.map(function(entries) {
//             return entries.map(function(element) {
//               // Convert each element into the proper format
//               // See convertDatapoint and convertIntervention for details
//               if( element.header && element.body ) {
//                 return convertDatapoint(element);
//               } else {
//                 return convertIntervention(element)
//               }
//             });
//           })
//         );
//
//         // Sort by date descending
//         return events.sort(function(a,b) {
//           return new Date(b.date) - new Date(a.date);
//         });
//       }
//
//       function flatten(arrays) {
//         return [].concat.apply([], arrays);
//       }
//
//       function load(models) {
//         vm.loading = true;
//         vm.events = []
//         $q.all( models.map(function(model) { return model.list() } ) ).then(function(data) {
//           vm.events = combine(data);
//         }).then(function() {
//           vm.loading = false;
//         });
//       }
//
//       // Allow the client to reload
//       vm.load = function() {
//         var models = [BloodGlucose, BloodPressure, BMI, BodyFat, BodyWeight, Cholesterol, WaistCircumference, Remarks];
//         load(models);
//       }
//
//       // Load the data on startup
//       vm.load();
//
//       // Enable deleting events
//       vm.remove = function(event) {
//         if(confirm('Are you sure?')) {
//           // Perform the actual removal
//           event.model.remove(event.id)
//             // First tell the frontend the removing succeeded and wait 200ms for the animation to be finished
//             .then(function() { event.removed = true; return $timeout(function() {}, 200); })
//
//             // After that, do the real reloading of the data in the backend. THis will actually
//             // delete the element from the cache and from the DOM
//             .then(function() { return event.model.load(); })
//             .then(function() { return vm.load(); })
//         }
//
//         return false;
//       }
//
//       // Enable the popover when clicking the add button
//       $ionicPopover.fromTemplateUrl('app/timeline/add_menu.html').then(function(popover) {
//         vm.popover = popover;
//       });
//
//       return vm;
// 		}
// })();
