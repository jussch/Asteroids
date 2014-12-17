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
    var img = new Image();
    img.src = "./graphics/ship.gif";
    this.image = img;
    this.baseAngle = 90 / 180 * Math.PI;
    this.imageBuffer = 15;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 15;
  Ship.COLOR = "red";

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.game.level = 0;
    this.game.asteroids = [];
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    var impulseVec = Asteroids.Util.angleToVec(impulse, this.angle);
    var theoVel = this.vel.slice(0);
    theoVel[0] += impulseVec[0];
    theoVel[1] += impulseVec[1];
    var theoAng = Asteroids.Util.vecToAngle(theoVel);
    var theoSpd = Asteroids.Util.vecToScalar(theoVel);
    if (theoSpd > 3) {
      theoVel = Asteroids.Util.angleToVec(3, theoAng);
    }
    this.vel = theoVel;
  };

  Ship.prototype.rotate = function(angle) {
    this.angle += angle;
  };

  Ship.prototype.fireBullet = function () {
    var bulletVel = Asteroids.Util.angleToVec(10, this.angle);
    this.game.add(
      new Asteroids.Bullet({pos: this.pos.slice(0), vel: bulletVel, game: this.game })
    );
  };

  Ship.prototype.fireSpecial = function () {
    for (var i = 0; i <= 10; i++) {
      var bulletSpd = Math.random() * 10 + 5;
      var bulletAng = (Math.random() * Math.PI / 4) - ( Math.random() * Math.PI / 4) + this.angle;
      var bulletVel = bulletVel = Asteroids.Util.angleToVec(bulletSpd, bulletAng);
      this.game.add(
        new Asteroids.Bullet({pos: this.pos.slice(0), vel: bulletVel, game: this.game })
      );
    }
  }

})();
