angular.module('scribbles.sketches', [])
.factory('one', function(p5) {
  return function(sketch) {
    var points;
  
    sketch.setup = function() {
      sketch.createCanvas(512, 512);
      
      sketch.background(255);
      sketch.stroke(0);

      points = _.times(128, function() {
        return new p5.Vector(sketch.random(0, sketch.width), sketch.random(0, sketch.height));
      });
    };

    sketch.draw = function() {
      if(sketch.frameCount > 128) {
        sketch.noLoop();
        return;
      }
      _.forEach(points, function(point) {
        var newPoint = p5.Vector.add(point, p5.Vector.random2D().setMag(16));
        sketch.line(point.x, point.y, newPoint.x, newPoint.y);
        point.set(newPoint);
      });
    };
  };
});
