import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  animations: [
    trigger("fadeIn", [
      state('in', style({opacity: 1})),

      transition(":enter", [
        style({opacity: 0}),
        animate(1000)
      ]),

      transition(':leave',
        animate(1000, style({opacity: 0})))
    ])
  ]
})
export class IntroComponent implements OnInit {
  @Input() text?: string;
  @Output() begin = new EventEmitter();

  fadeInClass: string;
  
  constructor() { }

  ngOnInit(): void {
    this.fadeInClass = "display";
  }

  introText() {
    return this.text || "Welcome! Click the button to begin.";
  }

  beginClicked() {
    this.begin.emit();
  }
}
