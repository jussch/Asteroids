(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (obj) {
    var rlength = Math.random() * Asteroid.LENGTH + .3;
    if (obj.vel === undefined) obj.vel = Asteroids.Util.randomVec(rlength);

    Asteroids.MovingObject.call(this,
      {color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
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
      if (otherObject.collidable <= 0 && this.collidable <= 0) {
        var pushVec = otherObject.pos.slice(0);
        pushVec[0] -= this.pos[0];
        pushVec[1] -= this.pos[1];

        while (Asteroids.Util.vecToScalar(pushVec) < otherObject.radius + this.radius) {
          this.pos[0] -= this.vel[0] / 10;
          this.pos[1] -= this.vel[1] / 10;
          otherObject.pos[0] -= otherObject.vel[0] / 10;
          otherObject.pos[1] -= otherObject.vel[1] / 10;

          pushVec = otherObject.pos.slice(0);
          pushVec[0] -= this.pos[0];
          pushVec[1] -= this.pos[1];
        }

        var pushAng = Asteroids.Util.vecToAngle(pushVec);
        var ratio = Math.pow((this.radius / otherObject.radius),2);

        var myColVec = Asteroids.Util.rotateVec(this.vel, pushAng);
        var otherColVec = Asteroids.Util.rotateVec(otherObject.vel, pushAng);

        var tempXVec = myColVec.slice(0);
        myColVec[0] = otherColVec[0] * ratio;
        otherColVec[0] = tempXVec[0] * ratio;

        console.log(this.vel)
        this.vel = Asteroids.Util.rotateVec(myColVec, -pushAng);
        otherObject.vel = Asteroids.Util.rotateVec(otherColVec, -pushAng);
        console.log(this.vel)

        this.move();
        otherObject.move();
        this.collidable = 5;
        otherObject.collidable = 5;
      }
    }
  };

})();
