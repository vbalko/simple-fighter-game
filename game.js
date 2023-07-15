var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// Fighter objects
var fighter1 = {x: 100, y: 100, width: 50, height: 50, color: 'blue'};
var fighter2 = {x: 300, y: 300, width: 50, height: 50, color: 'red'};

// Movement speed
var speed = 5;

// Draw function
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw fighter1
  ctx.fillStyle = fighter1.color;
  ctx.fillRect(fighter1.x, fighter1.y, fighter1.width, fighter1.height);

  // Draw fighter2
  ctx.fillStyle = fighter2.color;
  ctx.fillRect(fighter2.x, fighter2.y, fighter2.width, fighter2.height);
}

// Update function
function update() {
  // Simple movement logic for demonstration purposes
  fighter1.x += speed;
  if (fighter1.x + fighter1.width > canvas.width || fighter1.x < 0) {
    speed = -speed;
  }

  fighter2.y += speed;
  if (fighter2.y + fighter2.height > canvas.height || fighter2.y < 0) {
    speed = -speed;
  }
}

// Game loop
function gameLoop() {
  draw();
  update();

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
