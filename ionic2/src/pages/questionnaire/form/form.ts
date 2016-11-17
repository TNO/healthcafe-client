import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {QuestionnaireType} from "../../../questionnairetypes/questionnairetype";
import {AnswersService, Answer} from "../../../services/answers";
import {Vita16} from "../../../questionnairetypes/vita16";

export abstract class GenericQuestionnaireFormPage {
  static page(type: QuestionnaireType) {
    switch(type.questionnaireId) {
      case "vita16": return QuestionnaireVita16FormPage;
    }
  }
}

@Component({
  selector: 'questionnaire-form-vita16',
  templateUrl: 'vita16.html',
  providers: [AnswersService]
})
export class QuestionnaireVita16FormPage extends GenericQuestionnaireFormPage {
  constructor(public navCtrl: NavController, answersService: AnswersService) {
    super();
  }

  save() {
    event.preventDefault();
  }
}
