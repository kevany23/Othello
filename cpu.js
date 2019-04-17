class CPU {
    constructor(layout) {
        console.log("YO");
        this.layout = layout;
        this.ai = false;
        this.makeMove = this.randomMove;
    }
    setRandomMode() {
        this.ai = false;
    }
    setAIMode() {
        this.ai = true;
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