function Laser(sPos, angle){
  this.pos = createVector(sPos.x, sPos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);
  
  this.update = function (){
    this.pos.add(this.vel);
  }
  
  this.render = function(){
    push();
    stroke(255);
    strokeWeight(8);
    point(this.pos.x, this.pos.y);
    pop();
  }
  
  this.hits = function(asteroid){
     var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
     return d < asteroid.r;    
  }
  
  this.offscreen = function(){
      if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
        return true;
     }
     else {
       return false;
     }
  }
}