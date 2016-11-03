import { Injectable } from '@angular/core';
import {StorageService} from "./storage";
import {UUID} from "angular2-uuid";
import {AngularIndexedDB} from "../providers/angular2-indexeddb";

export interface Schema {
  namespace: string,
  name: string,
  version: string
}

export interface Datapoint {
  header: any,
  body: any
}

@Injectable()
export class GenericDatapointsService {
  private cache: any = null;
  private db: AngularIndexedDB;
  private storageReady: Promise<any>;

  /**
   * Constructor for a generic datapoint service. Available methods (returning a promise to perform the work async):
   *    load      Loads datapoints with the given schema from the NRC instance
   *    list      Returns datapoints with the given schema (from cache, if possible, otherwise using load())
   *    get       Returns a datapoint with the given ID
   *    remove    Removes a datapoint with the given ID
   *    create    Creates a new datapoint. Data specified is being converted using the converter (specified in the constructor)
   *
   *  The following methods return some metadata immediately
   *
   *    defaults  Returns a map with default values to show when a user creates a new datapoint
   *    chartableProperties Returns a comma-separated string with properties that can be charted for this datatype
   *
   * @param schema map with namespace, name and version, identifying the schema for this datatype
   * @param converter method to convert the data from a newly created dataobject (see GenericCreateController) into a OMH datapoint body
   */
  constructor(protected schema: Schema, protected converter: any, protected storageService: StorageService) {
    this.db = storageService.db
    this.storageReady = storageService.isReady();
  }

  load(): Promise<Datapoint[]> {
      let self = this;
      return this.storageReady.then(() => {
        console.log("Loading data for ", this.schema.name );
        return self.db
          .getAllByIndex('datapoints', 'schema', [this.schema.namespace, this.schema.name, this.schema.version]);
      });
  }

  list(): Promise<Datapoint[]> {
    if(this.cache !== null) {
      return Promise.resolve(this.cache);
    } else {
      return this.load();
    }
  }

  get(id: string): Promise<Datapoint> {
    return this.db
      .getByKey('datapoints', id);
  }


  remove(id:string): Promise<Datapoint> {
    return this.db.delete('datapoints', id)
  }

  create(body: any, date: Date): Promise<Datapoint> {
    // Convert data if appropriate
    if(this.converter) {
      body = this.converter(body);
    }

    // If invalid data is specified, according to the converter,
    // tell the user
    if( !body ) {
      return Promise.reject("Invalid data specified");
    }

    // Create the datapoint itself
    var datapoint = this.createDatapoint(body, date);

    return this.db.add('datapoints', datapoint, undefined);
  }

  import(data): Promise<Object> {
    if(Array.isArray(data)) {
      var that = this;
      data = data.map((datapoint) => {
        return that.convertDates(datapoint, that.parseDate);
      });

      return Promise.all(data.map((datapoint) => {
        return this.db.update('datapoints', datapoint, undefined);
      }));
    } else if(typeof data === "object") {
      data = this.convertDates(data, that.parseDate);
      return this.db.update('datapoints', data, undefined);
    }

  }

  static sortByDate(datapoints) {
    var length = datapoints.length;

    for (var i = 0; i < length-1; i++) { //Number of passes
      var min = i; //min holds the current minimum number position for each pass; i holds the Initial min number

      for (var j = i+1; j < length; j++) { //Note that j = i + 1 as we only need to go through unsorted array
        var datapoint1 = datapoints[j];
        var date1;
        if( datapoint1.body.effective_time_frame && datapoint1.body.effective_time_frame.date_time ) {
          date1 = datapoint1.body.effective_time_frame.date_time;
        } else {
          date1 = datapoint1.header.creation_date_time;
        }

        var datapoint2 = datapoints[min];
        var date2;
        if( datapoint2.body.effective_time_frame && datapoint2.body.effective_time_frame.date_time ) {
          date2 = datapoint2.body.effective_time_frame.date_time;
        } else {
          date2 = datapoint2.header.creation_date_time;
        }

        if(date1 > date2) { //Compare the numbers
          min = j; //Change the current min number position if a smaller num is found
        }
      }
      if(min != i) { //After each pass, if the current min num != initial min num, exchange the position.
        //Swap the numbers
        var tmp = datapoints[i];
        datapoints[i] = datapoints[min];
        datapoints[min] = tmp;
      }
    }

    return datapoints;
  }


  private createDatapoint(body: any, date: Date) {
    if( typeof(date) == 'undefined' )
      date = new Date();

    // Store effective date_time
    body.effective_time_frame = { date_time: date };

    return {
      header: {
        id: UUID.UUID(),
        creation_date_time: new Date(),
        acquisition_provenance: {
          source_name: 'Manual',
          source_creation_date_time: new Date(),
          modality: 'self-reported'
        },
        schema_id: this.schema
      },
      body: body
    }
  }

  // Handle dates, which are sent as string
  private parseDate(date:any): Date {
    if( date && typeof(date) == "string" ) {
      return new Date(date);
    } else {
      return date;
    }
  }

  private convertDates(datapoint: Datapoint, conversionMethod: (date:any)=>(Date)) {
    if(datapoint.header && datapoint.header.creation_date_time)
      datapoint.header.creation_date_time = conversionMethod(datapoint.header.creation_date_time);

    if(datapoint.header && datapoint.header.acquisition_provenance && datapoint.header.acquisition_provenance.source_creation_date_time)
      datapoint.header.acquisition_provenance.source_creation_date_time = conversionMethod(datapoint.header.acquisition_provenance.source_creation_date_time);

    if( datapoint.body && datapoint.body.effective_time_frame && datapoint.body.effective_time_frame.date_time)
      datapoint.body.effective_time_frame.date_time = conversionMethod(datapoint.body.effective_time_frame.date_time);

    return datapoint;
  }
}
