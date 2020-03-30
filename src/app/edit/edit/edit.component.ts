import { Component, OnInit } from '@angular/core';
import { GameStoreService } from 'src/app/game-store.service';
import { Game, Stage, Clue } from 'src/app/core/game';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  game : Game;
  stages : Stage[];
  selected? : Stage;
  selectedClue? : Clue;

  constructor(private gameStore: GameStoreService) { }

  ngOnInit(): void {
    this.loadStages();
  }

  loadStages() {
    this.game = this.gameStore.getRunningGame();
    this.stages = this.game.stages;
    if (this.stages && this.stages.length > 0) {
      this.selected = this.stages[0];
    }
  }

  stageSelected(stage : Stage) {
    this.selected = stage;
    this.clueSelected(undefined);
  }

  selectedIndex() {
    return this.stages.indexOf(this.selected);
  }

  totalStages() {
    return this.stages.length;
  }

  next() {
    const current = this.selectedIndex();
    if (current < this.stages.length - 1) {
      this.selected = this.stages[current + 1];
    }
  }

  previous() {
    const current = this.selectedIndex();
    if (current > 0) {
      this.selected = this.stages[current - 1];
    }
  }

  moveUp() {
    this.gameStore.moveStageUp(this.selected);
  }

  moveDown() {
    this.gameStore.moveStageDown(this.selected);
  }

  deleteStage() {
    let current = this.selectedIndex();
    this.gameStore.deleteStage(this.selected);
    if (current >= this.stages.length && current > 0) {
      --current;
    }

    if (current < this.stages.length) {
      this.selected = this.stages[current];
    } else {
      this.selected = undefined;
    }
  }

  newStage() {
    this.stageSelected(this.gameStore.newStage());
  }

  clueSelected(clue : Clue) {
    this.selectedClue = clue;
  }

  selectedClueIndex() {
    if (this.selected && this.selectedClue) {
      return this.selected.clues.indexOf(this.selectedClue);
    }
  }

  newClue() {
    this.selectedClue = this.selected.addClue();
  }

  totalClues() {
    return this.selected && this.selected.clues ? this.selected.clues.length : 0;
  }

  nextClue() {
    const clues = this.selected.clues;
    const current = this.selectedClueIndex();
    if (current < clues.length - 1) {
      this.selectedClue = clues[current + 1];
    }
  }

  previousClue() {
    const clues = this.selected.clues;
    const current = this.selectedClueIndex();
    if (current > 0) {
      this.selectedClue = clues[current - 1];
    }
  }

  moveClueUp() {
    this.selected.moveClueUp(this.selectedClue);
  }

  moveClueDown() {
    this.selected.moveClueDown(this.selectedClue);
  }

  deleteClue() {
    const clues = this.selected.clues;
    let current = this.selectedClueIndex();
    this.selected.deleteClue(this.selectedClue);
    if (current >= clues.length && current > 0) {
      --current;
    }

    if (current < clues.length) {
      this.selectedClue = clues[current];
    } else {
      this.selectedClue = undefined;
    }
  }

  save() {
    this.gameStore.saveGame();
  }

  onFileChanged(event) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = () => {
      this.gameStore.loadGame(JSON.parse(fileReader.result as string));
      this.loadStages();
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  onChange() {
    this.gameStore.saveGameState();
  }
}
