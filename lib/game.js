(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 1000;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(
        new Asteroids.Asteroid({pos: this.randomPosition(), game: this})
      );
    }
  };

  Game.prototype.randomPosition = function () {
    xpos = Math.floor(Math.random() * Game.DIM_X);
    ypos = Math.floor(Math.random() * Game.DIM_Y);
    return [xpos, ypos];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function (pos, radius) {
    if (pos[0] < -radius) {
      pos[0] = pos[0] + Game.DIM_X + radius * 2;
    } else if (pos[0] > Game.DIM_X + radius) {
      pos[0] = pos[0] - (Game.DIM_X + radius * 2)
    }
    if (pos[1] < -radius) {
      pos[1] = pos[1] + Game.DIM_Y + radius * 2;
    } else if (pos[1] > Game.DIM_Y + radius) {
      pos[1] = pos[1] - (Game.DIM_Y + radius * 2)
    }
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = 0; j < this.asteroids.length; j++) {
        if (i !== j && this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          var temp = this.asteroids[j];
          this.remove(this.asteroids[i]);
          this.remove(temp);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid),1);
  };

})();
