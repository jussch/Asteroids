(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Particle = Asteroids.Particle = function (options, tickFunction) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.alpha = options.alpha;
    this.duration = options.duration;
    this.game = options.game;
    this.tickFunction = tickFunction;
  };

  Particle.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    if (this.image === undefined) {
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    }
    ctx.fill();
  };

  Particle.prototype.move = function () {
    this.tickFunction();
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    var wrapped = this.game.wrap(this.pos, this.radius);
    if (wrapped && !this.isWrappable) {
      this.game.remove(this);
    }
    this.duration -= 1;
    if (this.duration <= 0) {this.game.remove(this);}
  };

  Particle.prototype.collideWith = function () {};

  Particle.prototype.isCollidedWith = function () {return false};


})();
