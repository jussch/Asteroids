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

  Util.multiplyVec = function (vec, degree) {
    vec[0] *= degree;
    vec[1] *= degree;
  }

  Util.drawRotatedImage = function (context, obj) {
    // http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
    var ratio = obj.radius / obj.imageBuffer;
    context.save();
    context.translate(obj.pos[0], obj.pos[1]);
    context.rotate(obj.angle + obj.baseAngle);
    var relWidth = obj.image.width / obj.imageIndexMaxX;
    var relHeight = obj.image.height / obj.imageIndexMaxY;
    context.drawImage(obj.image,
      // -(relWidth/2  * ratio) + (relWidth * obj.imageIndexX),
      // -(relHeight/2 * ratio) + (relHeight * obj.imageIndexY),
      // relWidth * ratio,
      // relHeight * ratio,
      // 0,
      // 0,
      // relWidth * ratio,
      // relHeight * ratio
      (relWidth * obj.imageIndexX),
      (relHeight * obj.imageIndexY),
      relWidth,
      relHeight,
      -(relWidth/2  * ratio),
      -(relHeight/2 * ratio),
      relWidth * ratio,
      relHeight * ratio
    );
    context.restore();
  };

})();
