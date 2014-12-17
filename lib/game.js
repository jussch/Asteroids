(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship({pos: this.randomPosition(), game: this});
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 20;

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };

  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(obj),1);
      if (obj.radius >= 13) {
        this.add(new Asteroids.Asteroid({
          pos: obj.pos,
          game: this,
          radius: obj.radius - 5,
          vel: obj.vel})
        );
      }
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj),1);
    }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(
        new Asteroids.Asteroid({pos: this.randomPosition(), game: this})
      );
    }
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  };

  Game.prototype.randomPosition = function () {
    xpos = Math.random() * Game.DIM_X;
    ypos = Math.random() * Game.DIM_Y;
    return [xpos, ypos];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (obj) {
      obj.move();
    });
  };

  Game.prototype.wrap = function (pos, radius) {
    var dims = [Game.DIM_X, Game.DIM_Y];
    var wrapped = false;

    for (var i in [0,1]) {
      if (pos[i] < -radius) {
        pos[i] = pos[i] + dims[i] + radius * 2;
        wrapped =  true;
      } else if (pos[i] > dims[i] + radius) {
        pos[i] = pos[i] - (dims[i] + radius * 2);
        wrapped = true;
      }
    }

    return wrapped;
  };

  Game.prototype.checkCollisions = function () {
    objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      for (var j = 0; j < objects.length; j++) {
        if (i !== j && objects[i].isCollidedWith(objects[j])) {
          objects[i].collideWith(objects[j]);
        }
      }
      objects[i].collidable -= 1
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

})();
