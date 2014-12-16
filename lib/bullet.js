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
    this.isWrappable = false;
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.COLOR = "gray";
  Bullet.RADIUS = 4;

  Bullet.prototype.collideWith = function (otherObj) {
    if (otherObj instanceof Asteroids.Asteroid) {
      this.game.remove(otherObj);
      this.game.remove(this);
    }
  };

})();
