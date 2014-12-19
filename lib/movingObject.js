(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (obj) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.radius = obj.radius;
    this.color = obj.color;
    this.game = obj.game;
    this.isWrappable = true;
    this.duration = -1;
    this.angle = 0;
    this.baseAngle = 0;
    this.imageBuffer = this.radius;
    this.density = 1.0;
    this.friction = 0.9995;
    this.alpha = 1.0
    this.rotation = 0;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    if (this.image === undefined) {
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    } else {
      //ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false)
      Asteroids.Util.drawRotatedImage(ctx, this);
    }
    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    Asteroids.Util.multiplyVec(this.vel, this.friction);

    this.tickEvent();

    var wrapped = this.game.wrap(this.pos, this.radius);
    if (wrapped && !this.isWrappable) {
      this.game.remove(this);
    }
    this.duration -= 1;
    if (this.duration === 0) {this.game.remove(this);}
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    //if (this === otherObject) { return false; }

    xDist = Math.abs(this.pos[0] - otherObject.pos[0]);
    yDist = Math.abs(this.pos[1] - otherObject.pos[1]);
    dist = Math.sqrt((xDist * xDist) + (yDist * yDist));

    radSum = this.radius + otherObject.radius;

    return (dist < radSum) ? true : false;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    // Empty for Moving Object.
  };

  MovingObject.prototype.mass = function () {
    return this.radius * this.radius * Math.PI * this.density;
  }

  MovingObject.prototype.bump = function (otherObject) {
    var meMass = this.mass();
    var otMass = otherObject.mass();
    var newVelX1 = (this.vel[0] * (meMass - otMass) + (2 * otMass * otherObject.vel[0])) / (meMass + otMass);
    var newVelY1 = (this.vel[1] * (meMass - otMass) + (2 * otMass * otherObject.vel[1])) / (meMass + otMass);
    var newVelX2 = (otherObject.vel[0] * (otMass - meMass) + (2 * meMass * this.vel[0])) / (meMass + otMass);
    var newVelY2 = (otherObject.vel[1] * (otMass - meMass) + (2 * meMass * this.vel[1])) / (meMass + otMass);
    this.vel = [newVelX1, newVelY1];
    otherObject.vel = [newVelX2, newVelY2];
    this.move();
    otherObject.move();
  }

  MovingObject.prototype.tickEvent = function () {
    // Empty for Moving Object.
  }

})();
