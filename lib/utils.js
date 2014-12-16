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
    var yVel = length * Math.sin(angle);
    var xVel = length * Math.cos(angle);
    return [xVel, yVel];
  };

})();
