function Ship() {
  this.pos = createVector(width / 2, height - 50); 
  this.r = 20;  
  this.vel = createVector(0, 0); 
  this.speed = 5;  
  this.lives = 3;

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.mult(0.95);  
    this.edges(); 
  }

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(255);
    stroke(78);
    strokeWeight(3);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);  //(left point, top point, right point); center of the triable is (0,0)
    pop();
  }

  // Prevent the ship from going off the screen
  this.edges = function() {
    if (this.pos.x - this.r < 0) {
      this.pos.x = this.r;
    } else if (this.pos.x + this.r > width) {
      this.pos.x = width - this.r;
    }
  }

  this.moveLeft = function() {
    this.vel.x = -this.speed;
  }

  this.moveRight = function() {
    this.vel.x = this.speed;
  }
  
  this.moveForwards = function() {
    this.vel.y = -this.speed;
  }
  
   this.moveBackwards = function() {
    this.vel.y = this.speed;
  }

  this.stop = function() {
    this.vel.x = 0;
  }

  // Check if the ship hits an asteroid (or any other object)
  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      this.lives--;
      return true;
    }
    return false;
  }

}
