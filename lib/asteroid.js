(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (obj) {
    var rlength = Math.random() * Asteroid.LENGTH + .3;
    var rradius = Math.random() * Asteroid.RADIUS + 5;
    if (obj.vel === undefined) obj.vel = Asteroids.Util.randomVec(rlength);
    if (obj.radius === undefined) obj.radius = rradius;

    Asteroids.MovingObject.call(this,
      {color: Asteroid.COLOR,
      radius: obj.radius,
      pos: obj.pos,
      vel: obj.vel,
      game: obj.game}
    );
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

})();
