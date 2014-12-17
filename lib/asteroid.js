(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (obj) {
    var rlength = Math.random() * Asteroid.LENGTH + .3;
    var rradius = Math.random() * Asteroid.RADIUS + 10;
    if (obj.vel === undefined) obj.vel = Asteroids.Util.randomVec(rlength);
    if (obj.radius === undefined) obj.radius = rradius;

    Asteroids.MovingObject.call(this,
      {color: Asteroid.COLOR,
      radius: obj.radius,
      pos: obj.pos,
      vel: obj.vel,
      game: obj.game}
    );
    var img = new Image();
    img.src = "./graphics/asteroid2.PNG";
    this.image = img;
    this.imageBuffer = 16;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = "#9E7909";
  Asteroid.RADIUS = 20;
  Asteroid.LENGTH = 1.5;

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Asteroid) {
      var newVelX1 = (this.vel[0] * (this.radius - otherObject.radius) + (2 * otherObject.radius * otherObject.vel[0])) / (this.radius + otherObject.radius);
      var newVelY1 = (this.vel[1] * (this.radius - otherObject.radius) + (2 * otherObject.radius * otherObject.vel[1])) / (this.radius + otherObject.radius);
      var newVelX2 = (otherObject.vel[0] * (otherObject.radius - this.radius) + (2 * this.radius * this.vel[0])) / (this.radius + otherObject.radius);
      var newVelY2 = (otherObject.vel[1] * (otherObject.radius - this.radius) + (2 * this.radius * this.vel[1])) / (this.radius + otherObject.radius);
      this.vel = [newVelX1, newVelY1];
      otherObject.vel = [newVelX2, newVelY2];
      this.move();
      otherObject.move();
    }
  };

  Asteroid.SPLAT = 60 / 180 * Math.PI;

  Asteroid.prototype.randomSplatVel = function (vel) {
    var newAngle = Math.random() * Asteroid.SPLAT * 2 - Asteroid.SPLAT;
    return Asteroids.Util.rotateVec(vel, newAngle);
  };

  Asteroid.prototype.randomSplatPos = function (pos, splits) {
    var randomVec = Asteroids.Util.randomVec(this.radius / 5 * splits);
    randomVec[0] += pos[0];
    randomVec[1] += pos[1];
    return randomVec;
  }

  Asteroid.prototype.destroy = function () {
    if (this.radius >= 17) {
      var splits = Math.floor(Math.random() * this.radius / 12 + 1);
      for (var i = 0; i < splits; i++) {
        var splatVel = this.randomSplatVel(this.vel)
        var splatPos = this.randomSplatPos(this.pos, splits)
        this.game.add(new Asteroids.Asteroid({
          pos: splatPos,
          game: this.game,
          radius: this.radius - 6 * splits,
          vel: splatVel
          })
        );
      }
    }
  };

})();
