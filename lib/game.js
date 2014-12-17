(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship({pos: this.randomPosition(), game: this});
    this.level = 0;
    this.spawnRate = -1;
    this.spawnZone = -1;
    this.timer = 0;
  };

  Game.DIM_X = 1024;
  Game.DIM_Y = 640;

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
      obj.destroy();
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(obj),1);
    }
  };

  Game.prototype.addAsteroids = function (num) {
    for (var i = 0; i < num; i++) {
      this.add(
        new Asteroids.Asteroid({pos: this.randomOutOfBounds(), game: this})
      );
    }
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  };

  Game.prototype.randomPosition = function () {
    var xpos = Math.random() * Game.DIM_X;
    var ypos = Math.random() * Game.DIM_Y;
    return [xpos, ypos];
  };

  Game.prototype.randomOutOfBounds = function () {
    var isX = (Math.random( ) >= 0.5)
    if (isX) {
      var xpos = Math.random() * Game.DIM_X;
      var ypos = -10;
    } else {
      var xpos = -10;
      var ypos = Math.random() * Game.DIM_Y;
    }
    return [xpos, ypos];
  }
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.font = "20pt Arial"
    ctx.fillText("Level: "+this.level, 20, 30)
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
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    this.timeCheck();
  };

  Game.prototype.timeCheck = function () {
    this.timer += 1
    if (this.spawnZone > this.timer && this.timer % this.spawnRate == 0) {
      this.addAsteroids(1);
    }
    if (this.asteroids.length === 0) {
      this.level += 1;
      this.addAsteroids(5);
      this.timer = 0;
      this.spawnRate = Math.floor(20-this.level);
      this.spawnZone = this.level * 30 + 60;
    }
  };

})();
