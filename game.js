var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// Fighter objects
var fighter1 = {x: 100, y: canvas.height - 60, width: 50, height: 50, color: 'blue', dx: 0};
var fighter2 = {x: 300, y: canvas.height - 60, width: 50, height: 50, color: 'red', dx: 0};

// Movement speed
var speed = 5;

// Key codes for A, D, J, and L keys
var KEY_A = 65, KEY_D = 68, KEY_J = 74, KEY_L = 76;

// Key press states
var keys = {};

// Add key event listeners
window.addEventListener('keydown', function(e) {
  keys[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
  keys[e.keyCode] = false;
});

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
  // Update fighter1's position
  if (keys[KEY_A]) fighter1.dx = -speed;
  else if (keys[KEY_D]) fighter1.dx = speed;
  else fighter1.dx = 0;

  // Update fighter2's position
  if (keys[KEY_J]) fighter2.dx = -speed;
  else if (keys[KEY_L]) fighter2.dx = speed;
  else fighter2.dx = 0;

  // Apply changes to the fighter's positions
  fighter1.x += fighter1.dx;
  fighter2.x += fighter2.dx;

  // Prevent fighters from going off screen
  fighter1.x = Math.max(0, Math.min(canvas.width - fighter1.width, fighter1.x));
  fighter2.x = Math.max(0, Math.min(canvas.width - fighter2.width, fighter2.x));
}

// Game loop
function gameLoop() {
  draw();
  update();

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
