/*
Class for board object/data functionality
Testing separation of concerns to the max
*/
class Board {
  constructor(layout) {
    this.layout = layout;
  }
  handleClick(x, y) {
    if (this.checkValid(x, y, "b") == -1) {
      return;
    }
    this.addPiece(x, y, "b");
  }
  /*
  TODO: also needs to check if can flip pieces
  */
  checkValid(x, y, color) {
    if (this.layout[x][y] != "x") {
      console.log("Invalid move");
      return -1;
    }
    // now check if can flip pieces
    let adjList = this.getAdjacents(x, y, color);
    console.log(adjList);
    let flip = false;
    for(let i = 0; i < adjList.length; i++) {
      let x2 = adjList[i].x;
      let y2 = adjList[i].y;
      if (this.checkDirection(x, y, x2, y2, color)) {
        console.log("Valid move");
        // time to flip pieces
        flip = true;

      }
    }
    if (flip) {
      return 1;
    }
    console.log("Invalid move");
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

      if ( currPoint.x >= 0 && currPoint.x < this.layout.length &&
        currPoint.y >=0 && currPoint.y < this.layout.length && 
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
      while( curr.x >= 0 && curr.x < this.layout.length &&
        curr.y >=0 && curr.y < this.layout.length) {
          if(this.layout[curr.x][curr.y] == color) {
            return true;
          }
          curr.x = curr.x + direction.x;
          curr.y = curr.y + direction.y;
      }
    return false;
  }
  flipDirection(x, y, dx, dy, color) {

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
  let array = [{x:x-1, y:y-1}, {x:x, y:y-1}, {x:x+1, y:y-1}, {x:x-1, y:y}, {x:x+1, y:y},
    {x:x-1, y:y+1}, {x:x, y:y+1}, {x:x+1, y:y+1}]
  return array;
}

function getDirection(x1, y1, x2, y2) {
  return {x: x2 - x1, y: y2-y1}
}