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
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
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

  };

})();
