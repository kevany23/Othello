/*
Javascript functionality for the page
*/
//require('./board.js');

/*
Global constants here
*/
const WIDTH = 640;
const HEIGHT = 640;
const PIECE_SIZE = 30;

var gameBoard;

/*
Initially loads board
*/
function loadGame() {
  var canvas = document.getElementById("game");
  drawBoard();
  // enables clicking on canvas
  canvas.addEventListener('click', onCanvasClick);
  var a = [];
  for(let i = 0; i < 8; i++) {
    b = [];
    for (let j = 0; j < 8; j++) {
      b.push("x");
    }
    a.push(b);
  }
  a[3][3] = "b";
  a[4][4] = "b";
  a[3][4] = "w";
  a[4][3] = "w";
  gameBoard = new Board(a);
  drawPieces();
}

/*
TODO: clicking grids to add pieces
storing data on pieces
*/

function onCanvasClick(event) {
  let x = event.offsetX;
  let y = event.offsetY;
  var pos = getPosition(x, y);
  var valid = gameBoard.handleClick(pos.x, pos.y);
  if (valid == -1) {
    return;
  }
  updateBoard();
  var result = gameBoard.checkWin("b");
  if(result == -1) {
    return;
  }
  else if (result == "w") {
    console.log("White wins!");
  }
  else if (result == "b") {
    console.log("Black wins!");
  }
}

function getPosition(x, y) {
  var pos = {};
  pos.x = Math.floor(x / (WIDTH/8));
  pos.y = Math.floor(y / (HEIGHT/8));
  return pos;
}

function updateBoard() {
  drawBoard();
  drawPieces();
}

function drawBoard() {
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext('2d');
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.strokeStyle = 'black';
  for (let i = 0; i <= WIDTH; i+= (WIDTH/8)) {
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, HEIGHT);
    ctx.stroke();
  }
  for (let j = 0; j <= HEIGHT; j+= (HEIGHT/8)) {
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(WIDTH, j);
    ctx.stroke();
  }
}

function drawPieces() {
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'black';
  let pieceList = gameBoard.getLayout();
  for (let i = 0; i < pieceList.length; i++) {
    for (let j = 0; j < pieceList[i].length; j++) {
      if (pieceList[i][j] == "w") {
          ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(i*(WIDTH/8)+(WIDTH/16), j*(HEIGHT/8)+(HEIGHT/16), PIECE_SIZE, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill();
      }
      else if (pieceList[i][j] == "b") {
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(i*(WIDTH/8)+(WIDTH/16), j*(HEIGHT/8)+(HEIGHT/16), PIECE_SIZE, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fill();
      }
    }
  }
}

function setRandom() {
  if( typeof gameBoard !== "undefined") gameBoard.setCPURandom();
}

function setAI() {
  if( typeof gameBoard !== "undefined") gameBoard.setCPUAI();
}
