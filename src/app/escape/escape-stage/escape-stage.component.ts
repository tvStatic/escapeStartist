import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Stage } from 'src/app/core/game';

@Component({
  selector: 'app-escape-stage',
  templateUrl: './escape-stage.component.html',
  styleUrls: ['./escape-stage.component.scss'],
  animations: [
    trigger("fadeIn", [
      state('in', style({opacity: 1})),

      transition(":enter", [
        style({opacity: 0}),
        animate(1000)
      ])
    ]),
    trigger("fadeOut", [
      state('in', style({opacity: 1})),

      transition(':leave',
        animate(1000, style({opacity: 0})))
    ]),
  ]
})
export class EscapeStageComponent implements OnInit {
  @Input() stage: Stage;
  @Output() success = new EventEmitter();

  code: string;
  enterCodeClicked: boolean;
  incorrectCode: boolean;

  constructor() {}

  ngOnInit(): void {
  }

  showEnterCodeButton() {
    return !this.enterCodeClicked && this.stage.exitCode;
  }

  onEnterCodeClicked() {
    this.enterCodeClicked = true;
  }

  showCodeInput() {
    return this.enterCodeClicked;
  }

  showIncorrectText() {
    return this.incorrectCode;
  }

  incorrectText() {
    return this.stage.incorrectText || "Incorrect!";
  }

  onCodeChange() {
    this.incorrectCode = false;
  }

  submit() {
    this.incorrectCode = !this.stage.isCodeCorrect(this.code);

    if (!this.incorrectCode) {
      this.enterCodeClicked = false;
      this.code = "";
      this.success.emit();
    }
  }
}
