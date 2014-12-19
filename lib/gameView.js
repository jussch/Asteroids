(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    window.setInterval(function () {
      this.checkInput();
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 1000/120);

    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var that = this;
    var boost = 0.4;
    var spin = 30 / 180 * Math.PI;

    // key('up', function () { that.game.ship.power(boost); });
    // key('down', function () { that.game.ship.power(-boost); });
    // key('left', function () { that.game.ship.rotate(-spin); });
    // key('right', function () { that.game.ship.rotate(spin); });
    key('space', function () { that.game.ship.rotate(Math.PI); });
    // key('x', function () { that.game.ship.fireBullet(); });
    // key('c', function () { that.game.ship.fireSpecial(); });

  };

  GameView.prototype.checkInput = function () {
    var that = this;
    var boost = 0.05;
    var spin = 2 / 180 * Math.PI;

    if(key.isPressed("up")) { that.game.ship.power(boost); };
    if(key.isPressed("left")) { that.game.ship.rotate(-spin); };
    if(key.isPressed("right")) { that.game.ship.rotate(spin); };
    // key('space', function () { that.game.ship.rotate(Math.PI); };
    if(key.isPressed("x")) { that.game.ship.fireBullet(); };
    if(key.isPressed("c")) { that.game.ship.fireSpecial(); };

  };

})();
