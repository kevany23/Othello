/*
Class for board object/data functionality
Testing separation of concerns to the max
*/
class Board {
  constructor(layout) {
    this.layout = layout;
    //this.cpu = new CPU(this.layout, "w");
    this.randomMode = true;
  }
  handleClick(x, y) {
    if (this.checkValid(x, y, "b") == -1) {
      return;
    }
    this.addPiece(x, y, "b");
    // add computer piece
    if (this.randomMode) {
      this.randomMove("w"); 
    }
    else {
      // ai move
      this.cpu = new CPU(this.layout, "w");
      var move = this.cpu.makeMove()
      this.addPiece(move.x, move.y, "w");
    }
  }
  /*
  TODO: also needs to check if can flip pieces
  */
  checkValid(x, y, color) {
    if (this.layout[x][y] != "x") {
      return -1;
    }
    // now check if can flip pieces
    let adjList = this.getAdjacents(x, y, color);
    let flip = false;
    for (let i = 0; i < adjList.length; i++) {
      let x2 = adjList[i].x;
      let y2 = adjList[i].y;
      if (this.checkDirection(x, y, x2, y2, color)) {
        // time to flip pieces
        flip = true;
        this.flipDirection(x, y, x2, y2, color);

      }
    }
    if (flip) {
      return 1;
    }
    return -1;
  }
  checkValid2(x, y, color) {
    if (this.layout[x][y] != "x") {
      //console.log("invalid");
      return -1;
    }
    // now check if can flip pieces
    let adjList = this.getAdjacents(x, y, color);
    let flip = false;
    for (let i = 0; i < adjList.length; i++) {
      let x2 = adjList[i].x;
      let y2 = adjList[i].y;
      if (this.checkDirection(x, y, x2, y2, color)) {
        // time to flip pieces
        flip = true;

      }
    }
    if (flip) {
      return 1;
    }
    return -1;
  }
  getLayout() {
    return this.layout;
  }
  addPiece(x, y, color) {
    this.layout[x][y] = color;
  }
  /*
  Helpers/calculating methods here
  */
  /*
  Get adjacent spaces with valid colors
   */
  getAdjacents(x, y, color) {

    let adjList = adjacentPoints(x, y);
    let opp = oppColor(color);
    let array = []
    for (let i = 0; i < adjList.length; i++) {
      let currPoint = adjList[i];

      if (currPoint.x >= 0 && currPoint.x < this.layout.length &&
        currPoint.y >= 0 && currPoint.y < this.layout.length &&
        this.layout[currPoint.x][currPoint.y] == opp) {
        array.push(adjList[i]);
      }
    }
    return array;
  }
  checkDirection(x1, y1, x2, y2, color) {
    let direction = getDirection(x1, y1, x2, y2);
    let curr = {};
    curr.x = x2;
    curr.y = y2;
    var count = 0;
    while (curr.x >= 0 && curr.x < this.layout.length &&
      curr.y >= 0 && curr.y < this.layout.length) {
      if (this.layout[curr.x][curr.y] == color && count > 0) {
        return true;
      }
      else if (this.layout[curr.x][curr.y] == 'x') {
        return false;
      }
      curr.x = curr.x + direction.x;
      curr.y = curr.y + direction.y;
      count++;
    }
    return false;
  }
  /*
  Currently assumes valid direction, as only called if direction is valid
  */
  flipDirection(x1, y1, x2, y2, color) {
    let direction = getDirection(x1, y1, x2, y2);
    let opp = oppColor(color);
    let curr = { x: x2, y: y2 };
    while (curr.x >= 0 && curr.x < this.layout.length &&
      curr.y >= 0 && curr.y < this.layout.length && this.layout[curr.x][curr.y] == opp) {
      this.layout[curr.x][curr.y] = color;
      curr.x = curr.x + direction.x;
      curr.y = curr.y + direction.y;
    }
  }
  setCPURandom() {
    this.randomMode = true;
  }

  setCPUAI() {
    this.randomMode = false;
  }
  /*
  Check if there is a winner
  */
  checkWin(color) {
    // first check full
    if (this.checkFull() || this.checkAvailableMoves(color).length == 0) {
      return this.getWinner();
    }
    return -1;

  }

  checkFull() {
    for (let i = 0; i < this.layout.length; i++) {
      for (let j = 0; j < this.layout[i].length; j++) {
        if (this.layout[i][j] == "x") {
          return false;
        }
      }
    }
    return true;
  }
  checkAvailableMoves(color) {
    var array = []
    for(let i = 0; i < this.layout.length; i++) {
      for(let j = 0; j < this.layout[i].length; j++) {
        if(this.checkValid2(i, j, color) != -1) {
          array.push({x:i, y:j});
        }
      }
    }
    return array;
  }
  getWinner() {
    var blackPieces = 0;
      var whitePieces = 0;
      for (let i = 0; i < this.layout.length; i++) {
        for (let j = 0; j < this.layout.length; j++) {
          if (this.layout[i][j] == "b") {
            blackPieces++;
          }
          else if (this.layout[i][j] == "w") {
            whitePieces++;
          }
        }
      }
      if (blackPieces > whitePieces) {
        //black wins
        return "b"
      }
      else if (whitePieces > blackPieces) {
        // white wins
        return "w"
      }
      else {
        return 0
      }
  }
  randomMove(color) {
    let moves = this.checkAvailableMoves(color);
      if (moves.length == 0) {
        console.log("Out of moves for CPU");
        return -1;
      }
      let index = Math.floor(Math.random()*moves.length);
      this.checkValid(moves[index].x, moves[index].y, color);
      this.addPiece(moves[index].x, moves[index].y, color);
  }
}

/*
For pieces
*/

class Piece {

}

/*
Helper functions, avoid putting everything into board class
*/

function oppColor(color) {
  if (color == "b") {
    return "w"
  }
  else if (color == "w") {
    return "b"
  }
  else {
    return "Error"
  }
}

function adjacentPoints(x, y) {
  let array = [{ x: x - 1, y: y - 1 }, { x: x, y: y - 1 }, { x: x + 1, y: y - 1 }, { x: x - 1, y: y }, { x: x + 1, y: y },
  { x: x - 1, y: y + 1 }, { x: x, y: y + 1 }, { x: x + 1, y: y + 1 }]
  return array;
}

function getDirection(x1, y1, x2, y2) {
  return { x: x2 - x1, y: y2 - y1 }
}