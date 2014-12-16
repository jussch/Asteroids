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

    key('up', function () { that.game.ship.power([0,-1]); });
    key('down', function () { that.game.ship.power([0,1]); });
    key('left', function () { that.game.ship.power([-1,0]); });
    key('right', function () { that.game.ship.power([1,0]); });
    key('x', function () { that.game.ship.fireBullet(); });
  };

})();
