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
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 1000/120);

    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var that = this;
    var boost = 0.4;
    var spin = 30 / 180 * Math.PI;

    key('up', function () { that.game.ship.power(boost); });
    key('down', function () { that.game.ship.power(-boost); });
    key('left', function () { that.game.ship.rotate(-spin); });
    key('right', function () { that.game.ship.rotate(spin); });
    key('space', function () { that.game.ship.rotate(Math.PI); });
    key('x', function () { that.game.ship.fireBullet(); });
    key('c', function () { that.game.ship.fireSpecial(); });

  };

})();
