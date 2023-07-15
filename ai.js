// In ai.js file

function updateFighter2AI(fighter1, fighter2) {
    var distance = fighter2.x - fighter1.x;
    var minDistance = 80 + 10 * Math.sin(Date.now() / 1000);  // Move back and forth slightly over time
  
    // Change behavior based on health level
    if (fighter2.health < 30) {
      // Defensive strategy: always try to move away from fighter1
      fighter2.dx = distance < 0 ? -speed : speed;
    } else {
      // Offensive strategy: approach fighter1 to punch, but keep some distance
      if (distance < minDistance) {
        fighter2.dx = speed;  // Move to the right
      } else if (distance > minDistance) {
        fighter2.dx = -speed;  // Move to the left
      } else {
        fighter2.dx = 0;
      }
      // Throw punches based on aggressiveness
      if (Math.random() < 0.01 * fighter2.aggressiveness && distance < minDistance + 10) {
        fighter2.punch();
      }
    }
  }
  