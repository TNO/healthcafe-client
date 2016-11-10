import { Injectable } from '@angular/core';
import {StorageService} from "./storage";
import {UUID} from "angular2-uuid";
import {AngularIndexedDB} from "../lib/angular2-indexeddb";
import {GenericDatapointsService, Datapoint, Schema} from "./generic_datapoints";

@Injectable()
export class StaticDatapointsService extends GenericDatapointsService {
  /**
   * Constructor for a generic datapoint service. Available methods (returning a promise to perform the work async):
   *    load      Loads datapoints with the given schema from the NRC instance
   *    list      Returns datapoints with the given schema (from cache, if possible, otherwise using load())
   *    import    Imports a list of datapoints into storage
   *
   *    get       Returns the current (static) datapoint
   *    set       Sets the current (static) datapoint. Please note that internally a new datapoint with a new UUID will be created.
   *    remove    Removes the current (static) datapoint
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
    super(schema, converter, storageService);
  }

  get(): Promise<Datapoint> {
    return new Promise((resolve, reject) => {
      this.list()
        .then((datapoints: Datapoint[]) => {
          if(datapoints.length > 0) {
            resolve(datapoints[0]);
          } else {
            reject("No datapoints available");
          }
        })
        .catch((e: any) => {
          reject(e);
        });
    });
  }

  remove(): Promise<Datapoint> {
    let self = this;
    return new Promise((resolve, reject) => {
      this.get()
        .then((datapoint: Datapoint) => {
          super.remove(<string> datapoint.header.id)
            .then(() => { resolve(datapoint); })
            .catch((e) => { reject(e); });
        })
        .catch((e: any) => {
          // No entry found, which is OK when removing
          resolve();
        });
    });
  }

  set(body: any, date: Date): Promise<Datapoint> {
    let self = this;

    return this.remove().then(() => {
      return self.create(body, date);
    });
  }

}
