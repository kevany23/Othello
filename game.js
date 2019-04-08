const WIDTH = 640;
const HEIGHT = 640;

function loadGame() {
  console.log("Loading game");
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  for (let i = (WIDTH/8); i < WIDTH; i+= (WIDTH/8)) {
    console.log(i);
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
}
