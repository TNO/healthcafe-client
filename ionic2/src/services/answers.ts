import {Injectable} from "@angular/core";
import {StorageService} from "./storage";
import {AngularIndexedDB} from "../lib/angular2-indexeddb";

export interface Answer {
  date_time: Date,
  questionnaire: any,
  answers: any
}

@Injectable()
export class AnswersService {
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
  constructor(protected storageService: StorageService) {
    this.db = storageService.db
    this.storageReady = storageService.isReady();
  }

  load(): Promise<Answer[]> {
      let self = this;
      return this.storageReady.then(() => {
        return self.db
          .getAll('answers');
      });
  }

  list(): Promise<Answer[]> {
    if(this.cache !== null) {
      return Promise.resolve(this.cache);
    } else {
      return this.load();
    }
  }

  create(body: any): Promise<Answer> {
    let self = this;

    // If invalid data is specified, according to the converter,
    // tell the user
    if( !body ) {
      return Promise.reject("Invalid data specified");
    }

    // Create the datapoint itself
    var answer = this.createAnswer(body);

    return this.storageReady.then(() => {
      return this.db.add('answers', answer, undefined).then((d) => {
        self.invalidateCache();
        return d;
      });
    });
  }

  public listByQuestionnaire(questionnaire: any) {
    let self = this;
    return this.storageReady.then(() => {
      return self.db
        .getAllByIndex('answers', 'questionnaire', questionnaire);
    });
  }

  private invalidateCache() {
    this.cache = null;
  }

  private createAnswer(body: any): Answer {
    return {
        date_time: new Date(),
        questionnaire: body.questionnaire,
        answers: body.answers
    };
  }
}


