import {Component, Input, ElementRef, Output, EventEmitter} from "@angular/core";
import {DatapointUtil} from "../services/datapointutil";
import {Datapoint} from "../services/generic_datapoints";
import {DataType} from "../datatypes/datatype";

@Component({
  selector: 'questionnaire-input-range',
  templateUrl: 'questionnaire-input-range.html',
})
export class QuestionnaireInputRange {
  @Input() question: String;
  @Input() answer: any;
  @Output() answerChange: any = new EventEmitter();

  updateAnswer(event) {
    this.answer = event;
    this.answerChange.emit(event);
  }
}
