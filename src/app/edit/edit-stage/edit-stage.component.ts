import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stage } from 'src/app/core/game';
import { GameStoreService } from 'src/app/game-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-stage',
  templateUrl: './edit-stage.component.html',
  styleUrls: ['./edit-stage.component.scss']
})
export class EditStageComponent implements OnInit {
  @Input() stage : Stage;
  @Input() index : number;
  @Input() total : number;
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() moveUp = new EventEmitter();
  @Output() moveDown = new EventEmitter();
  @Output() deleteStage = new EventEmitter();
  
  constructor(private gameStore : GameStoreService, private router : Router) { }

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
    this.deleteStage.emit();
  }

  playFromHere() {
    this.gameStore.setActiveStage(this.stage);
    this.router.navigate(["/escape"]);
  }

  saveGameState() {
    this.gameStore.saveGameState();
  }
}
