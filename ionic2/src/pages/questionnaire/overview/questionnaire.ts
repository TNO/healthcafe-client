import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {QuestionnaireType} from "../../../questionnairetypes/questionnairetype";
import {AnswersService, Answer} from "../../../services/answers";
import {GenericQuestionnaireFormPage} from "../form/form";

@Component({
  selector: 'questionnaire-overview',
  templateUrl: 'overview.html',
  providers: [AnswersService]
})

export class QuestionnaireOverviewPage {
  public answers: Answer[] = [];
  public questionnaireType: QuestionnaireType;

  constructor(public navCtrl: NavController, navParams: NavParams, answersService: AnswersService) {
    this.questionnaireType = navParams.get('questionnaireType');

    // Load answers
    let that = this;
    answersService
      .listByQuestionnaire(this.questionnaireType.questionnaireId)
      .then((answers) => {
        that.answers = answers;
      });
  }

  goToForm() {
    event.preventDefault();
    this.navCtrl.push(GenericQuestionnaireFormPage.page(this.questionnaireType))
  }
}
