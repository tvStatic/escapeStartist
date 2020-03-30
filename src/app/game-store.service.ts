import { Injectable } from '@angular/core';
import { Game, Stage } from './core/game';

@Injectable({
  providedIn: 'root'
})
export class GameStoreService {
  private readonly activeStageKey = "eh_activeStage";
  private readonly startTimeKey = "eh_startTime";
  private readonly pauseElapsedKey = "eh_pauseElapsed";
  private readonly gameKey = "eh_game";

  private runningGame : Game;
  private activeStage? : number;
  private startTime? : Date;
  private pauseElapsed? : number;

  constructor() {
    this.loadGameState();
    this.loadState();
  }

  private loadState() {
    function loadNumber(key: string) {
      let val = localStorage.getItem(key);
      if (val === "" || val === null) {
        return undefined;
      } else {
        try {
          return Number.parseInt(val, 10);
        } catch (err) {
          // ignore and reset active stage
          return undefined;
        }
      }
    }

    function loadDate(key: string) {
      let val = loadNumber(key);
      if (val !== undefined) {
        return new Date(val);
      }
    }

    this.activeStage = loadNumber(this.activeStageKey);
    this.startTime = loadDate(this.startTimeKey);
    this.pauseElapsed = loadNumber(this.pauseElapsedKey);
  }

  private saveState() {
    let val = "";
    if (this.activeStage !== undefined) {
      val = this.activeStage.toString();
    }
    localStorage.setItem(this.activeStageKey, val);

    val = "";
    if (this.startTime) {
      val = this.startTime.getTime().toString();
    }
    localStorage.setItem(this.startTimeKey, val);

    val = "";
    if (this.pauseElapsed) {
      val = this.pauseElapsed.toString();
    }
    localStorage.setItem(this.pauseElapsedKey, val);
  }

  private loadGameState() {
    let val = localStorage.getItem(this.gameKey);
    if (val === "" || val === null) {
      // load the sample game
      this.runningGame = this.createSampleGame();
      this.saveGameState();
    } else {
      try {
        this.runningGame = Game.fromObject(JSON.parse(val));
      } catch (err) {
        console.log(err);

        // load the sample game, but don't save it
        this.runningGame = this.createSampleGame();
      }
    }
  }

  public saveGameState() {
    let val = "";
    if (this.runningGame) {
      val = JSON.stringify(this.runningGame);
    }
    localStorage.setItem(this.gameKey, val);
  }

  public isStarted() {
    return this.activeStage !== undefined;
  }

  public getRunningGame() {
    return this.runningGame;
  }

  public getActiveStage() {
    if (!this.runningGame) {
      return;
    }

    if (this.activeStage >= this.runningGame.stages.length) {
      this.activeStage = 0;
      this.saveState();
    }
    return this.runningGame.stages[this.activeStage];
  }

  public nextStage() {
    if (this.activeStage < this.runningGame.stages.length - 1) {
      this.activeStage++;
      this.saveState();
    }

    return this.getActiveStage();
  }

  public setActiveStage(stage : Stage) {
    const index = this.runningGame.stages.indexOf(stage);
    this.activeStage = index;
    this.saveState();
  }

  public begin() {
    this.activeStage = 0;
    this.startTime = new Date();
    this.saveState();
  }

  public isPaused() {
    return this.pauseElapsed !== undefined;
  }

  public pauseResume() {
    if (this.startTime === undefined) {
      return;
    }

    const now = new Date();
    if (this.pauseElapsed === undefined) {
      // pause
      this.pauseElapsed = now.getTime() - this.startTime.getTime();
    } else {
      // resume
      this.startTime = new Date(now.getTime() - this.pauseElapsed);
      this.pauseElapsed = undefined;
    }

    this.saveState();
  }

  public reset() {
    this.activeStage = undefined;
    this.startTime = undefined;
    this.pauseElapsed = undefined;
    this.saveState();
  }

  public moveStageUp(stage : Stage) {
    const stages = this.runningGame.stages;
    const index = stages.indexOf(stage);
    if (index > 0) {
      stages.splice(index - 1, 0, stages.splice(index, 1)[0]);
    }
    this.saveGameState();
  }

  public moveStageDown(stage : Stage) {
    const stages = this.runningGame.stages;
    const index = stages.indexOf(stage);
    if (index < stages.length - 1) {
      stages.splice(index + 1, 0, stages.splice(index, 1)[0]);
    }
    this.saveGameState();
  }

  public deleteStage(stage : Stage) {
    const stages = this.runningGame.stages;
    const index = stages.indexOf(stage);
    stages.splice(index, 1);
    this.saveGameState();
  }

  public newStage(index?: number) {
    const stages = this.runningGame.stages;
    if (index === undefined) {
      index = stages.length;
    }

    const newStage = new Stage();
    if (index >= stages.length) {
      stages.push(newStage);
    } else {
      stages.splice(index, 0, newStage);
    }

    this.saveGameState();
    return newStage;
  }

  private static formatDuration(seconds: number) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds - (h * 3600)) / 60);
    let s = Math.floor(seconds - (h * 3600) - (m * 60));

    let hStr = h.toString();
    let mStr = m.toString();
    let sStr = s.toString();

    if (h < 10) { hStr = "0"+hStr; }
    if (m < 10) { mStr = "0"+mStr; }
    if (s < 10) { sStr = "0"+sStr; }
    return hStr+':'+mStr+':'+sStr;
  }

  public getTimer() {
    if (!this.runningGame || this.activeStage === undefined || !this.startTime) {
      return "--:--:--";
    }

    let now = Date.now();
    let then = this.startTime.getTime();
    let elapsed = (now - then) / 1000;

    if (this.pauseElapsed !== undefined) {
      elapsed = this.pauseElapsed / 1000;
    }

    if (!this.runningGame.timeLimit) {
      // just return the time
      return GameStoreService.formatDuration(elapsed);
    } else {
      // return time left
      let left = this.runningGame.timeLimit - elapsed;
      if (left < 0) {
        left = 0;
      }

      return GameStoreService.formatDuration(left);
    }
  }

  public saveGame() {
    const json = JSON.stringify(this.runningGame);
    const name = "escapeGame.json";
    const type = "application/octet-stream";
    const blob = new Blob([json], {type: type});
    const url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  }

  public loadGame(json : Object) {
    this.runningGame = Game.fromObject(json);
    this.reset();
  }

  private createSampleGame() {
    
    const ret = Game.fromObject({
      introduction: "Welcome to the example Escape Game.\nClick the button to begin.",
      stages: [
        {
          screenText: "You usually sit at me at least twice a day, often three times, and sometimes more.",
          exitCode: "7871",
          clues: [
            {
              text: "The first part of the code is on X's birthday.\nThe second part is on Y's birthday.",
              location: "dining table"
            },
            {text: "78", location: "calender/1"},
            {text: "71", location: "calender/2"}
          ]
        },
        {
          screenText: "Well done! Your next clue can be found on a large rubber animal who loves floating on water.",
          exitCode: "DB",
          clues: [
            {
              text: "The code is two letters - the first is the first letter of what I am, the second is the first letter of where you would normally play with me.",
              location: "rubber duck"
            }
          ]
        },
        {
          screenText: "Your next clue: I'm a little nutty and good friends with bread - my name does not start with N",
          exitCode: "3398",
          clues: [
            {
              text: "  1234\n+ 2164\n  ----\n\n",
              location: "peanut butter"
            }
          ]
        },
        {
          screenText: "Congratulations on getting this far. Your next clue is: PS (4 - 1)",
          exitCode: "63",
          clues: [
            {
              text: "The first part of the code is the number of PS3 games on the TV cabinet.\nThe second part is the number of Xbox 360 games",
              location: "PS3"
            }
          ]
        },
        {
          screenText: "Your next clue was split up and given to both of us. We are sisters without parents and we like to sing",
          exitCode: "5251",
          clues: [
            {
              text: "Cipher:\n" +
              "ABCDEFGHIJKLM\n" + 
              "1234567890123",
              location: "Elsa"
            },
            {
              text: "NOPQRSTUVWXYZ\n" +
              "0987654321098\n\nDecode: ELSA",
              location: "Anna"
            }
          ]
        },
        {
          screenText: "X has left something of hers on the floor in the lounge.",
          clues: [
            {text: "I don't belong here! Where do I belong?", location: "clothing (floor)"},
            {text: "The code is the Japanese word for Training Hall", location: "laundry basket"}
          ],
          exitCode: "DOJO"
        },
        {
          screenText: "Congratulations! You have beaten the game!"
        }
      ]
    });
    
    // const ret = new Game();
    // ret.stages = [
    //   Object.assign(new Stage(), {
    //     screenText: "Welcome! Enter 1234 to continue",
    //     exitCode: "1234"
    //   }),
    //   Object.assign(new Stage(), {
    //     screenText: "Well done! Enter ABCD to continue",
    //     exitCode: "ABCD"
    //   }),
    //   Object.assign(new Stage(), {
    //     screenText: "Congratulations! You win!"
    //   })
    // ];

    return ret;
  }
}
