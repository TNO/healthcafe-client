import { Injectable } from '@angular/core';
import {AngularIndexedDB} from "../lib/angular2-indexeddb";

@Injectable()
export class StorageService {
  private _db: AngularIndexedDB;
  private promise: Promise<any> = null;

  constructor() {
    this._db = new AngularIndexedDB('healthcafe', 2);
    this.promise = this._db.createStore(2, (evt) => {
      let db = evt.currentTarget.result;

      let datapointsStore = db.createObjectStore('datapoints', { keyPath: "header.id" });
      datapointsStore.createIndex('schema', [ 'header.schema_id.namespace', 'header.schema_id.name', 'header.schema_id.version'], { 'unique': false } );

      db.createObjectStore('remarks', { keyPath: "id", autoIncrement: true });

      let answersStore = db.createObjectStore('answers', { keyPath: "id", autoIncrement: true });
      answersStore.createIndex( "questionnaire", "questionnaire", { unique: false } );
    });
  }

  isReady(): Promise<any> {
    return this.promise;
  }

  get db(): AngularIndexedDB {
    return this._db;
  }
  set db(value:AngularIndexedDB) {
    this._db = value;
  }
}

