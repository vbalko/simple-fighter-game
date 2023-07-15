// Constants
var canvas = document.getElementById('gameCanvas');
// var fighter1SVG = document.getElementById('fighter1SVG');
// var fighter2SVG = document.getElementById('fighter2SVG');
// var fighter1Image = new Image();
// fighter1Image.src = 'data:image/svg+xml,' + encodeURIComponent(fighter1SVG.outerHTML);

// var fighter2Image = new Image();
// fighter2Image.src = 'data:image/svg+xml,' + encodeURIComponent(fighter2SVG.outerHTML);

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
  this.startY = canvas.height - 60; // Store the original starting y position
  this.dy = 0; // Vertical speed
  this.jumpSpeed = 10; // Jump speed
  this.gravity = 0.5; // Gravity
  this.onGround = true; // Is the fighter on the ground?
  this.jump = function() {
    if (this.onGround) {
      this.dy = -this.jumpSpeed; // Jump up
      this.onGround = false;
    }
  };
  this.color = color;
  this.dx = 0;
  this.health = 100;
  this.punching = false;
  this.punchResolved = true; //ensures, that punch will decrease health only once
  this.punchAnimationDuration = 300; // Duration of punch animation in milliseconds
  this.dead = false;
  this.punch = function() {
    if (!this.punching) {
      this.punching = true;
      this.punchResolved = false;

      // Deduct health points
      this.health -= 1;

      setTimeout(() => {
        this.punching = false;
        this.punchResolved = true;
      }, this.punchAnimationDuration);

      if (this.health <= 0) {
        this.dead = true;
        gameOver = true;
      }
    }
  };
}

// Create fighters
var fighter1 = new Fighter(100, 'blue');
var fighter2 = new Fighter(300, 'red');

fighter2.aggressiveness = Math.random() * 10;  // Initialize to a random value between 0 and 10

// Game variables
var keys = {};
var gameOver = false;

// Event Listeners
window.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
    if (!gameOver) {
      if (e.keyCode === KEY_S) fighter1.punch();
      if (e.keyCode === KEY_K) fighter2.punch();
      if (e.keyCode === KEY_SPACE) fighter1.jump(); // Add this line
    } else if (e.keyCode === KEY_SPACE) {
      restartGame();
    }
  });

window.addEventListener('keyup', function(e) {
  keys[e.keyCode] = false;
});

// Game Functions
function drawFighter(fighter, svgNormal, svgPunch) {
    var image = new Image();
    
    if(fighter.punching) {
      image.src = 'data:image/svg+xml,' + encodeURIComponent(svgPunch.outerHTML);
    } else {
      image.src = 'data:image/svg+xml,' + encodeURIComponent(svgNormal.outerHTML);
    }
    
    ctx.drawImage(image, fighter.x, fighter.y, fighter.width, fighter.height);
  }
  
  

function drawHealthBar(fighter) {
  ctx.fillStyle = 'green';
  ctx.fillRect(fighter.x, fighter.y - 20, fighter.health / 2, 10);
}

function drawHealthPoints(fighter, x, y, name) {
    ctx.fillStyle = 'yellow';
    ctx.font = '20px Arial';
    ctx.fillText(name + ' Health: ' + fighter.health, x, y);
  }
  function updateFighterPosition(fighter, otherFighter, leftKey, rightKey) {
    if (Math.abs(fighter.x - otherFighter.x) < fighter.width && 
        !(fighter.y < otherFighter.y || fighter.y > otherFighter.y + otherFighter.height)) {
      if (fighter.x < otherFighter.x) {
        fighter.dx = 0;
      } else {
        fighter.dx = 0;
      }
    } else {
      if (keys[leftKey]) fighter.dx = -speed;
      else if (keys[rightKey]) fighter.dx = speed;
      else fighter.dx = 0;
    }
    
    fighter.x += fighter.dx;
    fighter.x = Math.max(0, Math.min(canvas.width - fighter.width, fighter.x));
    
    if (!fighter.onGround) {
      fighter.dy += fighter.gravity; // Apply gravity
    } else {
      fighter.dy = 0;
    }
    
    fighter.y += fighter.dy;
    
    if (fighter.y > fighter.startY) { // If the fighter is below the ground
      fighter.y = fighter.startY; // Put him on the ground
      fighter.onGround = true;
    } 
  }
  
  function checkForPunch(fighter1, fighter2) {
    if (fighter1.punching && !fighter1.punchResolved) {
        // Only allow the punch to land if both fighters are on the ground or both are in the air
        if ((fighter1.onGround && fighter2.onGround) || (!fighter1.onGround && !fighter2.onGround)) {
            if (Math.abs(fighter1.x - fighter2.x) < punchDistance && Math.abs(fighter1.y - fighter2.y) < fighter1.height) {
                fighter2.x += 10;  // Move fighter2 to the right
                fighter2.health -= 10;  // Reduce fighter2's health
                fighter1.punchResolved = true;
                if (fighter2.health <= 0) {
                    fighter2.dead = true;
                    gameOver = true;
                }
            }
        }
    }
    if (fighter2.punching && !fighter2.punchResolved) {
        // Only allow the punch to land if both fighters are on the ground or both are in the air
        if ((fighter1.onGround && fighter2.onGround) || (!fighter1.onGround && !fighter2.onGround)) {
            if (Math.abs(fighter2.x - fighter1.x) < punchDistance && Math.abs(fighter2.y - fighter1.y) < fighter2.height) {
                fighter1.x -= 10;  // Move fighter1 to the left
                fighter1.health -= 7;  // Reduce fighter1's health
                fighter2.punchResolved = true;
                if (fighter1.health <= 0) {
                    fighter1.dead = true;
                    gameOver = true;
                }
            }
        }
    }
}


  

function restartGame() {
  // Reset fighters
  fighter1.health = 100;
  fighter1.dead = false;
  fighter1.x = 100;
  fighter2.health = 100;
  fighter2.dead = false;
  fighter2.x = 300;
  fighter2.aggressiveness = Math.random() * 10;  // Reset to a random value between 0 and 10

  gameOver = false;
}

function drawGameOver() {
  ctx.fillStyle = 'yellow';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
  ctx.fillText(fighter1.dead ? 'Fighter 2 Wins!' : 'Fighter 1 Wins!', canvas.width / 2, canvas.height / 2 + 30);
  ctx.fillText('Press Spacebar to Restart', canvas.width / 2, canvas.height / 2 + 60);
}

function drawAggressiveness(fighter, x, y) {
    ctx.font = '15px Arial';
    var healthBasedAggressiveness = fighter.aggressiveness * (1 + (100 - fighter.health) / 100);
    ctx.fillText('Aggressiveness: ' + healthBasedAggressiveness.toFixed(2), x, y);
  }
  
// Define star positions and colors
let stars = [];
for (let i = 0; i < 10; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height - 60),
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255
    });
}

// Generate clouds
let clouds = [];
let numClouds = Math.floor(Math.random() * 11) + 5; // Random number between 5 and 15
for (let i = 0; i < numClouds; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height / 2; // Only in the upper half of the canvas
    let size = Math.random() * 50 + 50; // Random size between 50 and 100
    clouds.push({x: x, y: y, size: size});
}


function drawBackground(ctx) {
    // Create sky gradient
    var skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height - 60);
    skyGradient.addColorStop(0, '#00008b'); // Dark blue at the top of the sky
    skyGradient.addColorStop(1, '#8b0000'); // Dark red at the horizon

    // Draw sky
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height - 60);

    // Draw stars
    for (let star of stars) {
        ctx.fillStyle = `rgb(${star.r}, ${star.g}, ${star.b})`; // Star color
        ctx.fillRect(star.x, star.y, 5, 5); // Each star is a larger 5x5 rectangle

        // Update star color for next frame
        star.r = Math.random() * 255;
        star.g = Math.random() * 255;
        star.b = Math.random() * 255;
    }

   // Draw clouds
   ctx.fillStyle = '#ffcccc'; // Light red color
   ctx.globalAlpha = 0.1; // Make the clouds semi-transparent
   for (let cloud of clouds) {
       // Draw each cloud as 5 overlapping circles
       for (let i = 0; i < 5; i++) {
           ctx.beginPath();
           ctx.arc(cloud.x + i * cloud.size / 5, cloud.y, cloud.size / 5, 0, Math.PI * 2, false);
           ctx.fill();
       }
   }
   ctx.globalAlpha = 1; // Reset transparency for the rest of the drawing


    // Draw sun
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height - 60, 50, 0, Math.PI * 2, false);
    ctx.fillStyle = '#ffbb00'; // Sun color
    ctx.fill();

    // Draw ground
    ctx.fillStyle = '#663300'; // Ground color
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

    // Draw clouds and birds here
    // Note: You'll need images or more complex shapes for these
}


  
// Draw function
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    drawBackground(ctx);

    // Draw health bars and health points
    drawHealthBar(fighter1);
    drawHealthBar(fighter2);
    drawHealthPoints(fighter1, 10, 30, 'Fighter 1');
    drawHealthPoints(fighter2, canvas.width - 200, 30, 'Fighter 2'); // Adjusted position
    drawAggressiveness(fighter2, canvas.width - 200, 50); // Adjusted position
  

  
    // Draw fighters
    drawFighter(fighter1, fighter1SVGNormal, fighter1SVGPunch);
    drawFighter(fighter2, fighter2SVGNormal, fighter2SVGPunch);
  
    // Draw game over message
    if (gameOver) drawGameOver();
  }
  
    

// Update function
function update() {
// Update fighter1's position
if (!gameOver) {
    updateFighterPosition(fighter1, fighter2, KEY_A, KEY_D);
  }

  // AI for fighter2
  if (!gameOver) {
    updateFighter2AI(fighter1, fighter2);
  }

  // Apply changes to the fighter's positions
  fighter1.x += fighter1.dx;
  fighter2.x += fighter2.dx;

  // Prevent fighters from going off screen
  fighter1.x = Math.max(0, Math.min(canvas.width - fighter1.width, fighter1.x));
  fighter2.x = Math.max(0, Math.min(canvas.width - fighter2.width, fighter2.x));

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
