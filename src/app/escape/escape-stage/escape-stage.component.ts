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
    trigger("fade", [
      transition(":enter", [
        style({opacity: 0}),
        animate(1000)
      ]),
      transition(':leave', [
        animate(1000, style({opacity: 0}))
      ])
    ]),
    trigger("fadeIn", [
      transition(":enter", [
        style({opacity: 0}),
        animate(1000)
      ])
    ]),
  ]
})
export class EscapeStageComponent implements OnInit {
  @Input() stage: Stage;
  @Output() success = new EventEmitter();

  show: boolean;
  code: string;
  enterCodeClicked: boolean;
  incorrectCode: boolean;

  constructor() {}

  ngOnInit(): void {
    this.show = true;
  }

  ngOnChanges(): void {
    setTimeout(() => {
      this.show = true;
    }, 1000);
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
      this.show = false;
      this.success.emit();
    }
  }
}
