import {QuestionnaireType} from "./questionnairetype";
import {Injectable} from "@angular/core";

@Injectable()
export class Vita16 implements QuestionnaireType {
  public questionnaireId = "vita16";
  public overviewTitle = "Vita16 vragenlijst";

  public constructor() {}
}
