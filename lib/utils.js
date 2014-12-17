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
  };

  Util.rotateVec = function (vec, angle) {
    var scal = Util.vecToScalar(vec);
    var oAngle = Util.vecToAngle(vec);
    return Util.angleToVec(scal, oAngle + angle);
  };

  Util.drawRotatedImage = function (context, obj) {
    // http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
    var ratio = obj.radius / obj.imageBuffer;
    context.save();
    context.translate(obj.pos[0], obj.pos[1]);
    context.rotate(obj.angle + obj.baseAngle);
    context.drawImage(obj.image,
      -(obj.image.width/2 * ratio),
      -(obj.image.height/2* ratio),
      obj.image.width * ratio,
      obj.image.height * ratio);
    context.restore();
  };

})();
