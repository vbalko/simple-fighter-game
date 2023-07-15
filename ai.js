function updateFighter2AI(fighter1, fighter2) {
    // Calculate aggressiveness based on health. The lower the health, the higher the aggressiveness.
    var healthBasedAggressiveness = fighter2.aggressiveness * (1 + (100 - fighter2.health) / 100);
  
    if (Math.abs(fighter1.x - fighter2.x) < punchDistance) {
      if (Math.random() < healthBasedAggressiveness / 20) { // Aggressiveness now depends on health
        fighter2.punch();
      }
    }
  
    if (Math.abs(fighter1.x - fighter2.x) < punchDistance * 2) {
      if (fighter1.x < fighter2.x && fighter2.x - fighter1.x > fighter2.width) {
        fighter2.dx = -speed;
      } else if (fighter1.x > fighter2.x && fighter1.x - fighter2.x > fighter2.width) {
        fighter2.dx = speed;
      } else {
        fighter2.dx = 0;
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
  
    // If fighter1 is punching and fighter2 is on the ground, there's a chance fighter2 will jump to avoid the punch
    if (fighter1.punching && fighter2.onGround && Math.random() < 0.3) { // Lowered chance to jump
      fighter2.jump();
    }
  
    // If fighter1 is in the air and fighter2 is on the ground, there's a chance fighter2 will jump to match fighter1's height
    if (!fighter1.onGround && fighter2.onGround && Math.random() < 0.3) { // Lowered chance to jump
      fighter2.jump();
    }
  }
  