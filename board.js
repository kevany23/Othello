/*
Class for board object/data functionality
Testing separation of concerns to the max
*/
class Board {
  constructor(layout) {
    this.layout = layout;
  }
  handleClick(x, y) {
    if (this.checkValid(x, y) == -1) {
      return;
    }
    this.addPiece(x, y, "b");
  }
  checkValid(x, y) {
    if (this.layout[x][y] != "x") {
      console.log("Invalid move");
      return -1;
    }
    console.log("Valid move");
  }
  getLayout() {
    return this.layout;
  }
  addPiece(x, y, color) {
    this.layout[x][y] = color;
  }
}

/*
For pieces
*/

class Piece {

}
