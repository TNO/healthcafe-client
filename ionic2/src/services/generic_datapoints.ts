import { Injectable } from '@angular/core';
import {StorageService} from "./storage";
import {UUID} from "angular2-uuid";
import {AngularIndexedDB} from "../lib/angular2-indexeddb";
import {DatapointUtil} from "./datapointutil";

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
  protected db: AngularIndexedDB;
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
  constructor(public schema: Schema, protected converter: any, protected storageService: StorageService) {
    this.db = storageService.db
    this.storageReady = storageService.isReady();
  }

  load(): Promise<Datapoint[]> {
      let self = this;
      return this.storageReady.then(() => {
        return self.db
          .getAllByIndex('datapoints', 'schema', [self.schema.namespace, self.schema.name, self.schema.version]);
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
    let self = this;
    return this.storageReady.then(() => {
      return self.db
        .getByKey('datapoints', id);
    });
  }


  remove(id:string): Promise<Datapoint> {
    let self = this;
    return this.storageReady.then(() => {
      return self.db.delete('datapoints', id).then((d) => {
        self.invalidateCache();
        return d;
      });
    });
  }

  create(body: any, date: Date): Promise<Datapoint> {
    let self = this;

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

    return this.storageReady.then(() => {
      return this.db.add('datapoints', datapoint, undefined).then((d) => {
        self.invalidateCache();
        return d;
      });
    });
  }

  import(data): Promise<Object> {
    if(Array.isArray(data)) {
      var self = this;
      data = data.map((datapoint) => {
        return DatapointUtil.convertDates(datapoint, self.parseDate);
      });

      // TODO: Add support for upsert statements
      return this.storageReady.then(() => {
        return Promise.all(data.map((datapoint) => {
          return self.db.update('datapoints', datapoint, undefined);
        })).then((d) => {
          self.invalidateCache();
          return d;
        });
      });
    } else if(typeof data === "object") {
      data = DatapointUtil.convertDates(data, self.parseDate);
      return this.storageReady.then(() => {
        return this.db.update('datapoints', data, undefined).then((d) => {
          self.invalidateCache();
          return d;
        });
      });
    }

  }

  private invalidateCache() {
    this.cache = null;
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

}
