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
    this.friction = .99;
    this.fireDelay = 0;
    this.specialDelay = 0;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 15;
  Ship.COLOR = "red";

  Ship.prototype.relocate = function () {
    this.pos = [520,320];//this.game.randomPosition();
    this.game.level = 0;
    this.game.asteroids = [];
    this.vel = [0,0];
    this.angle = 0;
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
    if (this.fireDelay > 0) {return;};
    this.fireDelay = 8;
    var bulletVel = Asteroids.Util.angleToVec(20, this.angle);
    this.game.add(
      new Asteroids.Bullet({pos: this.pos.slice(0), vel: bulletVel, game: this.game })
    );
  };

  Ship.prototype.fireSpecial = function () {
    if (this.specialDelay > 0) {return;};
    this.specialDelay = 90;
    this.fireDelay = 90;
    for (var i = 0; i <= 10; i++) {
      var bulletSpd = Math.random() * 20 + 10;
      var bulletAng = (Math.random() * Math.PI / 4) - ( Math.random() * Math.PI / 4) + this.angle;
      var bulletVel = bulletVel = Asteroids.Util.angleToVec(bulletSpd, bulletAng);
      this.game.add(
        new Asteroids.Bullet({pos: this.pos.slice(0), vel: bulletVel, game: this.game })
      );
    }
  }

  Ship.prototype.tickEvent = function () {
    this.fireDelay -= 1;
    this.specialDelay -= 1;
  }

})();
