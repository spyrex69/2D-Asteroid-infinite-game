var ship;
var lasers = [];
let barz = [];
var asteroids = [];

let barSpeed = 2; 
let barInterval = 80;
let lastSpeedIncreaseTime = 0; 
let lastIncreaseInAsteroid = 0; 
let speedIncreaseInterval = 5000;
let AsteroidIncreadInterval = 500;
let numOfAsteroids = 2;
let score = 0;          // Add score variable
let gameOver = false;    // Add gameOver state

function setup() {
  createCanvas(700, 700);
  for (var i = 0; i < numOfAsteroids; i++) {
    asteroids.push(new Asteroid());
  }
  ship = new Ship();
  barz.push(new Bar());
}

function draw() {
  background(0);

  fill(255);
  textSize(24);
  text("Score: " + score, 10, 30);
  
  if (gameOver) {
    textSize(50);
    fill(255, 0, 0);
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2);
    fill(255);
    textSize(20);
    text("Tip: You can shoot bullets by pressing spacebar", width / 2, height / 2 + 30);
    noLoop();  // Stop the draw loop
    return;
  }

  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      gameOver = true;  
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  if (frameCount % barInterval == 0) {
    barz.push(new Bar());
  }
  if (frameCount % AsteroidIncreadInterval == 0) {
    asteroids.push(new Asteroid());
  }
  updateBarSpeed();
  updateAsteroids();

  for (let i = barz.length - 1; i >= 0; i--) {
    barz[i].update();
    barz[i].show();

    if (barz[i].hits(ship)) {
      gameOver = true;  
    }

    if (barz[i].offScreen()) {
      barz.splice(i, 1);
      score++;  
    }
  }

  for (let i = lasers.length - 1; i > 0; i--) {
    lasers[i].render();
    lasers[i].update();

    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  ship.render();
  ship.update();
  ship.edges();
}

function keyPressed() {
  if (key == ' ' && !gameOver) {
    lasers.push(new Laser(ship.pos, 30));
  } else if (keyCode == RIGHT_ARROW) {
    ship.moveRight(4);
  } else if (keyCode == LEFT_ARROW) {
    ship.moveLeft(4);
  } else if (keyCode == UP_ARROW) {
    ship.moveForwards(4);
  } else if (keyCode == DOWN_ARROW) {
    ship.moveBackwards(4);
  }
}

function updateBarSpeed() {
  if (millis() - lastSpeedIncreaseTime > speedIncreaseInterval) {
    barSpeed += 0.2;
    lastSpeedIncreaseTime = millis();
  }
}
function updateAsteroids() {
  if (millis() - lastIncreaseInAsteroid > AsteroidIncreadInterval) {
    numOfAsteroids++;
    lastIncreaseInAsteroid = millis();
  }
}
