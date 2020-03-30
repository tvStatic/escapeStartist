import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'escapeHome';
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
