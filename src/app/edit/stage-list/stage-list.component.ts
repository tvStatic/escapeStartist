import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stage } from 'src/app/core/game';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.scss']
})
export class StageListComponent implements OnInit {
  @Input() stages : Stage[];
  @Input() selected? : Stage;
  @Output() stageSelected = new EventEmitter<Stage>();
  @Output() newStage = new EventEmitter();

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

  stageExpanderClass() {
    if (this.collapsed) {
      return "s-hide";
    }
  }

  getSelectedClass(stage: Stage) {
    if (stage === this.selected) {
      return "selected";
    }
  }

  onClick(stage: Stage) {
    if (stage !== this.selected) {
      this.stageSelected.emit(stage);
    }
  }

  onNew() {
    this.newStage.emit();
  }
}
