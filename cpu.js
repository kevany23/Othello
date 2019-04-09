class CPU {
    constructor(layout) {
        console.log("YO");
        this.layout = layout;
        this.ai = false;
    }
    setRandomMode() {
        this.ai = false;
    }
    setAIMode() {
        this.ai = true;
    }
    makeMove() {
        if (this.ai) {
            return randomMove();
        }
        else {

        }
    }
    /*
    Return x, y of selected position
    */
    randomMove() {
        let x = Math.floor(Math.random() * this.layout.length);
        let y = Math.floor(Math.random() * this.layout.length);
        return {x:x, y:y}

    }
}