import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Clue } from 'src/app/core/game';

@Component({
  selector: 'app-edit-clue',
  templateUrl: './edit-clue.component.html',
  styleUrls: ['./edit-clue.component.scss']
})
export class EditClueComponent implements OnInit {
  @Input() clue : Clue;
  @Input() index : number;
  @Input() total : number;
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() moveUp = new EventEmitter();
  @Output() moveDown = new EventEmitter();
  @Output() deleteClue = new EventEmitter();
  @Output() change = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onNext() {
    this.next.emit();
  }

  onPrevious() {
    this.previous.emit();
  }

  onMoveUp() {
    this.moveUp.emit();
  }

  onMoveDown() {
    this.moveDown.emit();
  }

  onDelete() {
    this.deleteClue.emit();
  }

  onChange() {
    this.change.emit();
  }
}
