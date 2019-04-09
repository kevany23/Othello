/*
Javascript functionality for the page
*/
//require('./board.js');

/*
Global constants here
*/
const WIDTH = 640;
const HEIGHT = 640;

var gameBoard;

/*
Initially loads board
*/
function loadGame() {
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  for (let i = (WIDTH/8); i < WIDTH; i+= (WIDTH/8)) {
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, HEIGHT);
    ctx.stroke();
  }
  for (let j = (HEIGHT/8); j < HEIGHT; j+= (HEIGHT/8)) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(WIDTH, j);
    ctx.stroke();
  }
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
  console.log(a);
  gameBoard = new Board(a);
  console.log(gameBoard.getLayout());
}

/*
TODO: clicking grids to add pieces
storing data on pieces
*/

function onCanvasClick(event) {
  console.log("Clicked");
  //console.log(event);
  let x = event.offsetX;
  let y = event.offsetY;
  var pos = getPosition(x, y);
  console.log("x: " + pos.x + "\ty: " + pos.y);
}

function getPosition(x, y) {
  var pos = {};
  pos.x = Math.floor(x / (WIDTH/8));
  pos.y = Math.floor(y / (HEIGHT/8));
  return pos;
}
