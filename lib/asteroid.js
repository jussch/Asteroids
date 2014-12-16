(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (obj) {
    var rlength = Math.random() * Asteroid.LENGTH + 1;

    Asteroids.MovingObject.call(this,
      {color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      pos: obj.pos,
      vel: Asteroids.Util.randomVec(rlength),
      game: obj.game}
    );
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = "#9E7909";
  Asteroid.RADIUS = 20;
  Asteroid.LENGTH = 4;

})();
