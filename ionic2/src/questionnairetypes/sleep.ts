import {QuestionnaireType} from "./questionnairetype";
import {Injectable} from "@angular/core";

@Injectable()
export class Sleep implements QuestionnaireType {
  public questionnaireId = "sleep";
  public overviewTitle = "Slaap vragenlijst";
  public constructor() {}
}
