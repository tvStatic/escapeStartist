import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      state("open", style({
        opacity: 1
      })),
      state("closed", style({
        opacity: 0
      })),
      transition("open => closed", [
        animate("0.5s")
      ]),
      transition("closed => open", [
        animate("0.5s")
      ])
    ])
  ]
})
export class AppComponent {
  title = 'escapeStartist';
  collapsed = true;

  getCollapsedClass() {
    if (this.collapsed) {
      return "hide";
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
