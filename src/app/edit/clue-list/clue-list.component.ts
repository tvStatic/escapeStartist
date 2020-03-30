import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Clue } from 'src/app/core/game';

@Component({
  selector: 'app-clue-list',
  templateUrl: './clue-list.component.html',
  styleUrls: ['./clue-list.component.scss']
})
export class ClueListComponent implements OnInit {
  @Input() clues : Clue[];
  @Input() selected? : Clue;
  @Output() clueSelected = new EventEmitter<Clue>();
  @Output() newClue = new EventEmitter();

  private collapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  expanderIcon() {
    if (this.collapsed) {
      return "collapsed";
    }
  }

  collapsedClass() {
    if (this.collapsed) {
      return "s-hide";
    }
  }

  isSelected(clue: Clue) {
    return clue === this.selected;
  }

  selectedClass(clue: Clue) {
    if (this.isSelected(clue)) {
      return "selected";
    }
  }

  onClick(clue: Clue) {
    this.clueSelected.emit(clue);
  }

  onNew() {
    this.newClue.emit();
  }
}
