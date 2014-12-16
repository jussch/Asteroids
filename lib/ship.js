(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (obj) {

    Asteroids.MovingObject.call(this,
    {color: Ship.COLOR,
      radius: Ship.RADIUS,
      pos: obj.pos,
      vel: [0,0],
      game: obj.game}
    );
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = "red";

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    var bulletVel = Asteroids.Util.angleToVec(10, Asteroids.Util.vecToAngle(this.vel));
    this.game.add(
      new Asteroids.Bullet({pos: this.pos.slice(0), vel: bulletVel, game: this.game })
    );
  };

})();
