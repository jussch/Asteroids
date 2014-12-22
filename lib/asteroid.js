(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (obj) {
    var rlength = Math.random() * Asteroid.LENGTH + .3;
    var rradius = Math.random() * Asteroid.RADIUS + 4 * obj.game.level;
    if (obj.vel === undefined) obj.vel = Asteroids.Util.randomVec(rlength);
    if (obj.radius === undefined) obj.radius = rradius;
    if (obj.asteroidType === undefined) obj.asteroidType = 1;
    this.asteroidType = obj.asteroidType;

    Asteroids.MovingObject.call(this,
      {color: Asteroid.COLOR,
      radius: obj.radius,
      pos: obj.pos,
      vel: obj.vel,
      game: obj.game}
    );
    var img = new Image();
    img.src = "./graphics/asteroid"+this.asteroidType+".PNG";
    this.image = img;
    this.imageBuffer = this.asteroidType === 1 ? 16 : 38;
    this.rotation = (Math.random() - 0.5) * Math.PI / 16
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = "#9E7909";
  Asteroid.RADIUS = 30;
  Asteroid.LENGTH = 1.5;

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Asteroid) {
      if (otherObject.asteroidType === 2) {return;}
      if (this.asteroidType === 2 && otherObject.asteroidType === 1) {
        this.game.remove(otherObject);
        this.radius += Math.sqrt(otherObject.radius);
      } else {
        this.rotation = otherObject.rotation + (Math.random() - 0.5) * Math.PI / 48
        otherObject.rotation = this.rotation + (Math.random() - 0.5) * Math.PI / 48
      }
      this.bump(otherObject);
    }
  };

  Asteroid.SPLAT = 60 / 180 * Math.PI;

  Asteroid.prototype.randomSplatVel = function (vel) {
    var newAngle = Math.random() * Asteroid.SPLAT * 2 - Asteroid.SPLAT;
    return Asteroids.Util.rotateVec(vel, newAngle);
  };

  Asteroid.prototype.SplatPos = function (pos, splits, spot) {
    var angle = Math.PI / splits * spot * 2
    var randomVec = Asteroids.Util.angleToVec(this.radius, angle);
    randomVec[0] += pos[0];
    randomVec[1] += pos[1];
    return randomVec;
  }

  Asteroid.prototype.destroy = function () {
    // Split Effect
    if (this.radius >= 25) {
      var splits = Math.floor(Math.random() * this.radius / 40 + 2);
      for (var i = 0; i < splits; i++) {
        var splatVel = this.randomSplatVel(this.vel)
        var splatPos = this.SplatPos(this.pos, splits, i)
        this.game.add(new Asteroids.Asteroid({
          pos: splatPos,
          game: this.game,
          radius: this.radius - 9 * splits,
          vel: splatVel,
          asteroidType: this.asteroidType
          })
        );
      }
    }
    // Particle Effect
    var numberOfParticles = Math.random() * this.radius + 2;
    this.game.addParticles(numberOfParticles, function () {
      var randTime = Math.random() * 30 + 40;
      // var partVel = Asteroids.Util.randomVec(Math.random() * 3 + 0.5)
      var partVel = this.randomSplatVel(this.vel);
      var partAng = Asteroids.Util.vecToAngle(partVel);
      var partSpd = Asteroids.Util.vecToScalar(partVel);
      partVel = Asteroids.Util.angleToVec(Math.random() * 2 + 1.5, partAng);
      return new Asteroids.Particle({
        pos: this.pos.slice(0),
        vel: partVel,
        radius: Math.random() * Math.sqrt(this.radius) + 1,
        color: "#E6D0AC",
        alpha: 1.0,
        duration: randTime - 1,
        game: this.game
      }, function() {
        this.alpha -= 1.0 / randTime;
        Asteroids.Util.multiplyVec(this.vel, 0.99);
      });
    }.bind(this));
  };

  Asteroid.prototype.tickEvent = function () {
    this.angle += this.rotation;
  }

})();
