function Bar(y= 0) {
  var spacing = random(100, width / 2);
  
  var centerX = random(spacing / 2, width - spacing / 2);

  this.left = centerX - spacing / 2;
  this.right = centerX + spacing / 2;

  this.y = y;
  this.w = 20;
  this.speed = barSpeed;  
  this.highlight = false;

  this.show = function () {
    fill(255,0,0);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(0, this.y, this.left, this.w);
    // right pipe
    rect(this.right, this.y, width - this.right, this.w);
  };

  this.update = function () {
    this.y += this.speed;
  };

  this.hits = function (bird) {
  let outsideGap = ship.pos.x < this.left || ship.pos.x > this.right;
  let withinBarHeight = ship.pos.y > this.y && ship.pos.y < this.y + this.w;

  if (outsideGap && withinBarHeight) {
    this.highlight = true;
    return true;
  }

  this.highlight = false;
  return false;
  };

  this.offScreen = function () {
    return this.y > height;
  };
}


