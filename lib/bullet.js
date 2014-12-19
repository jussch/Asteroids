(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (obj) {

    Asteroids.MovingObject.call(this,
    {color: Bullet.COLOR,
      radius: Bullet.RADIUS,
      pos: obj.pos,
      vel: obj.vel,
      game: obj.game}
    );
    this.duration = 50;
    this.friction = 0.970;
    this.density = 3;
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.COLOR = "white";
  Bullet.RADIUS = 4;

  Bullet.prototype.collideWith = function (otherObj) {
    if (otherObj instanceof Asteroids.Asteroid) {
      this.bump(otherObj);
      Asteroids.Util.multiplyVec(otherObj.vel, 1.5);
      this.game.remove(otherObj);
      this.game.remove(this);
    }
  };

  Bullet.prototype.tickEvent = function() {
    this.alpha = 1.0 - (50 - this.duration) / 90;
  }

})();
