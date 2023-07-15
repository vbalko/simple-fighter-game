var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// Fighter objects
var fighter1 = {
  x: 100, y: canvas.height - 60, width: 50, height: 50, color: 'blue', dx: 0, punching: false,
  punch: function() { this.punching = true; }
};
var fighter2 = {
  x: 300, y: canvas.height - 60, width: 50, height: 50, color: 'red', dx: 0, punching: false,
  punch: function() { this.punching = true; }
};

// Movement speed and punch distance
var speed = 5;
var punchDistance = 60;

// Key codes for A, D, J, and L keys
var KEY_A = 65, KEY_D = 68, KEY_J = 74, KEY_L = 76, KEY_S = 83, KEY_K = 75;

// Key press states
var keys = {};

// Add key event listeners
window.addEventListener('keydown', function(e) {
  keys[e.keyCode] = true;
  if (e.keyCode === KEY_S) fighter1.punch();
  if (e.keyCode === KEY_K) fighter2.punch();
});
window.addEventListener('keyup', function(e) {
  keys[e.keyCode] = false;
});

// Draw function
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw fighter1
  ctx.fillStyle = fighter1.punching ? 'lightblue' : fighter1.color;
  ctx.fillRect(fighter1.x, fighter1.y, fighter1.width, fighter1.height);

  // Draw fighter2
  ctx.fillStyle = fighter2.punching ? 'pink' : fighter2.color;
  ctx.fillRect(fighter2.x, fighter2.y, fighter2.width, fighter2.height);
}

// Update function
function update() {
  // Store old positions
  var oldX1 = fighter1.x, oldX2 = fighter2.x;

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

  // Prevent fighters from stepping over each other
  if (Math.abs(fighter1.x - fighter2.x) < fighter1.width) {
    // Restore old positions
    fighter1.x = oldX1;
    fighter2.x = oldX2;
  }

  // Check for punches
  if (fighter1.punching && Math.abs(fighter1.x - fighter2.x) < punchDistance) {
    fighter2.x += 10;  // Move fighter2 back a bit
  }
  if (fighter2.punching && Math.abs(fighter2.x - fighter1.x) < punchDistance) {
    fighter1.x -= 10;  // Move fighter1 back a bit
  }

  // Reset punching states
  fighter1.punching = false;
  fighter2.punching = false;
}

// Game loop
function gameLoop() {
  draw();
  update();

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
