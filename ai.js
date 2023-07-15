// AI for fighter2
function updateFighter2AI(fighter1, fighter2) {
    if (Math.abs(fighter1.x - fighter2.x) < punchDistance) {
      if (Math.random() < fighter2.aggressiveness / 10) {
        fighter2.punch();
      }
    }
  
    if (Math.abs(fighter1.x - fighter2.x) < punchDistance * 2) {
      if (fighter1.x < fighter2.x) {
        fighter2.dx = -speed;
      } else {
        fighter2.dx = speed;
      }
    } else {
      // This part makes the AI move back and forth randomly
      if (Math.random() < 0.01) {  // 1% chance per frame
        fighter2.dx = speed;  // Move right
      } else if (Math.random() < 0.02) {  // 1% chance per frame
        fighter2.dx = -speed;  // Move left
      } else {
        fighter2.dx = 0;  // Stop moving
      }
    }
  }
  