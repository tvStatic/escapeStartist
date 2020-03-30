import { Component, OnInit } from '@angular/core';
import { GameStoreService } from 'src/app/game-store.service';
import { Clue } from 'src/app/core/game';

@Component({
  selector: 'app-clue-sheet',
  templateUrl: './clue-sheet.component.html',
  styleUrls: ['./clue-sheet.component.scss']
})
export class ClueSheetComponent implements OnInit {
  clues: Clue[];

  constructor(private gameStore: GameStoreService) { }

  ngOnInit(): void {
    let game = this.gameStore.getRunningGame();
    if (game) {
      this.clues = [];
      game.stages.forEach((s) => {
        if (s.clues) {
          this.clues = this.clues.concat(s.clues);
        }
      });
    }
  }
}
