import { Component, OnInit } from '@angular/core';
import { GameStoreService } from 'src/app/game-store.service';
import { Game } from 'src/app/core/game';

@Component({
  selector: 'app-escape',
  templateUrl: './escape.component.html',
  styleUrls: ['./escape.component.scss']
})
export class EscapeComponent implements OnInit {
  game: Game
  private timer: string;
  private interval;

  constructor(private gameStore: GameStoreService) { }

  ngOnInit(): void {
    this.game = this.gameStore.getRunningGame();

    this.interval = setInterval(() => {
      this.timer = this.gameStore.getTimer();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  showIntro() {
    return !this.gameStore.isStarted();
  }

  currentStage() {
    return this.gameStore.getActiveStage();
  }

  onBegin() {
    this.gameStore.begin();
  }

  success() {
    this.gameStore.nextStage();
  }

  onReset() {
    this.gameStore.reset();
  }

  getTimer() {
    return this.timer;
  }

  pauseResume() {
    this.gameStore.pauseResume();
  }

  getTimerClass() {
    if (this.gameStore.isPaused()) {
      return "paused";
    } else {
      return "playing";
    }
  }
}
