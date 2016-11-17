import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {QuestionnaireType} from "../../../questionnairetypes/questionnairetype";
import {AnswersService, Answer} from "../../../services/answers";
import {Vita16} from "../../../questionnairetypes/vita16";
import {QuestionnaireInputRange} from "../../../components/questionnaire-input-range";

export abstract class GenericQuestionnaireFormPage {
  public answers: any = {};

  public constructor(public questionnaireType: QuestionnaireType, public answersService: AnswersService, public navCtrl: NavController) {}

  public save() {
    let data = {
      questionnaire: this.questionnaireType.questionnaireId,
      answers: this.answers
    };

    this.answersService.create(data)
      .then(() => {
        this.navCtrl.pop();
      })
      .catch((e) => {
        console.log( "Error saving data: ", e );
      });
  }

  static page(type: QuestionnaireType) {
    switch(type.questionnaireId) {
      case "vita16": return QuestionnaireVita16FormPage;
    }
  }

}

@Component({
  selector: 'questionnaire-form-vita16',
  templateUrl: 'vita16.html',
  providers: [AnswersService, Vita16]
})
export class QuestionnaireVita16FormPage extends GenericQuestionnaireFormPage {
  constructor(type: Vita16, navCtrl: NavController, answersService: AnswersService) {
    super(type, answersService, navCtrl);

    this.answers = {
      q01: 4,
      q02: 4
    };
  }
}
