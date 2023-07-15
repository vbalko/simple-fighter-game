// Constants
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
var KEY_A = 65, KEY_D = 68, KEY_J = 74, KEY_L = 76, KEY_S = 83, KEY_K = 75, KEY_SPACE = 32;
var speed = 5;
var punchDistance = 60;

// Fighter Class
function Fighter(x, color) {
  this.x = x;
  this.y = canvas.height - 60;
  this.width = 50;
  this.height = 50;
  this.color = color;
  this.dx = 0;
  this.health = 100;
  this.punching = false;
  this.dead = false;
  this.punch = function() {
    this.punching = true;
  };
}

// Create fighters
var fighter1 = new Fighter(100, 'blue');
var fighter2 = new Fighter(300, 'red');

// Game variables
var keys = {};
var gameOver = false;

// Event Listeners
window.addEventListener('keydown', function(e) {
  keys[e.keyCode] = true;
  if (!gameOver) {
    if (e.keyCode === KEY_S) fighter1.punch();
    if (e.keyCode === KEY_K) fighter2.punch();
  } else if (e.keyCode === KEY_SPACE) {
    restartGame();
  }
});

window.addEventListener('keyup', function(e) {
  keys[e.keyCode] = false;
});

// Game Functions
function drawFighter(fighter) {
  ctx.fillStyle = fighter.dead ? 'black' : (fighter.punching ? 'lightblue' : fighter.color);
  ctx.fillRect(fighter.x, fighter.y, fighter.width, fighter.height);
}

function drawHealthBar(fighter) {
  ctx.fillStyle = 'green';
  ctx.fillRect(fighter.x, fighter.y - 20, fighter.health / 2, 10);
}

function drawHealthPoints(fighter, x, y) {
  ctx.font = '20px Arial';
  ctx.fillText(fighter.health, x, y);
}

function updateFighterPosition(fighter, leftKey, rightKey) {
  if (keys[leftKey]) fighter.dx = -speed;
  else if (keys[rightKey]) fighter.dx = speed;
  else fighter.dx = 0;
  fighter.x += fighter.dx;
  fighter.x = Math.max(0, Math.min(canvas.width - fighter.width, fighter.x));
}

function checkForPunch(fighter1, fighter2) {
    if (fighter1.punching && Math.abs(fighter1.x - fighter2.x) < punchDistance) {
      fighter2.x += 10;  // Move fighter2 to the right
      fighter2.health -= 10;  // Reduce fighter2's health
      if (fighter2.health <= 0) {
        fighter2.dead = true;
        gameOver = true;
      }
    }
    if (fighter2.punching && Math.abs(fighter2.x - fighter1.x) < punchDistance) {
      fighter1.x -= 10;  // Move fighter1 to the left
      fighter1.health -= 10;  // Reduce fighter1's health
      if (fighter1.health <= 0) {
        fighter1.dead = true;
        gameOver = true;
      }
    }
    fighter1.punching = false;
    fighter2.punching = false;
  }
  

function restartGame() {
  fighter1.health = 100;
  fighter1.dead = false;
  fighter1.x = 100;
  fighter2.health = 100;
  fighter2.dead = false;
  fighter2.x = 300;
  gameOver = false;
}

function drawGameOver() {
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
  ctx.fillText(fighter1.dead ? 'Fighter 2 Wins!' : 'Fighter 1 Wins!', canvas.width / 2, canvas.height / 2 + 30);
  ctx.fillText('Press Spacebar to Restart', canvas.width / 2, canvas.height / 2 + 60);
}

// Draw function
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw health bars and health points
  drawHealthBar(fighter1);
  drawHealthBar(fighter2);
  drawHealthPoints(fighter1, 10, 30);
  drawHealthPoints(fighter2, canvas.width - 50, 30);

  // Draw fighters
  drawFighter(fighter1);
  drawFighter(fighter2);

  // Draw game over message
  if (gameOver) drawGameOver();
}

// Update function
function update() {
  // Update fighters' positions
  if (!gameOver) {
    updateFighterPosition(fighter1, KEY_A, KEY_D);
    updateFighterPosition(fighter2, KEY_J, KEY_L);
  }

  // Check for punches
  checkForPunch(fighter1, fighter2);
  checkForPunch(fighter2, fighter1);
}

// Game loop
function gameLoop() {
  draw();
  update();

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
