(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = { };

  Util.inherits = function (child, parent) {
    var Dummy = function () {};
    Dummy.prototype = parent.prototype;
    child.prototype = new Dummy();
  };

  Util.randomVec = function (length) {
    var angle = Math.random() * 2 * Math.PI;
    return Util.angleToVec(length, angle);
  };

  Util.vecToAngle = function (vec) {
    return Math.atan2(vec[1], vec[0]);
  };

  Util.angleToVec = function (scalar, angle) {
    var yVel = scalar * Math.sin(angle);
    var xVel = scalar * Math.cos(angle);
    return [xVel, yVel];
  };

  Util.vecToScalar = function (vec) {
    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
  }

  Util.rotateVec = function (vec, angle) {
    var scal = Util.vecToScalar(vec);
    var oAngle = Util.vecToAngle(vec);
    return Util.angleToVec(scal, oAngle + angle);
  }

})();
