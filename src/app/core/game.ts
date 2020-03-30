

export class Clue {
    public text: string;
    public location?: string;
}

export class Stage {
    public exitCode? : string;
    public screenText: string;
    public clues: Clue[];

    public incorrectText? : string;

    public isCodeCorrect(code: string) {
        if (!code || !this.exitCode) {
            return false;
        }

        code = code.toLowerCase().trim();
        return code === this.exitCode.toLowerCase().trim();
    }

    public addClue() {
        const ret = new Clue();
        this.clues.push(ret);
        return ret;
    }

    public moveClueUp(clue : Clue) {
        const clues = this.clues;
        const index = clues.indexOf(clue);
        if (index > 0) {
          clues.splice(index - 1, 0, clues.splice(index, 1)[0]);
        }
    }
    
    public moveClueDown(clue : Clue) {
        const clues = this.clues;
        const index = clues.indexOf(clue);
        if (index < clues.length - 1) {
            clues.splice(index + 1, 0, clues.splice(index, 1)[0]);
        }
    }

    public deleteClue(clue : Clue) {
        const clues = this.clues;
        const index = clues.indexOf(clue);
        clues.splice(index, 1);
    }
}

export class Game {
    public introduction?: string;
    public stages : Stage[];
    public stageCodes : string[];
    public timeLimit?: number;
    public failText?: string;

    public static fromObject(o : any) {
        let ret = Object.assign(new Game(), o);
        ret.stages = o.stages.map((s) => {
            return Object.assign(new Stage(), s);
        });

        return ret;
    }
}
