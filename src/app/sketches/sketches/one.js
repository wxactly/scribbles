angular.module('scribbles.sketches')
.run(function(sketchList) {
  sketchList.push({
    name: 'one'
  });
})
.factory('one', function(p5, scribblerFactory) {
  return function(sketch) {
    var scribblers;
  
    sketch.setup = function() {
      sketch.createCanvas(512, 512);
      
      sketch.background(255);
      sketch.stroke(0);

      scribblers = _.chain(_.times(128))
        .map(function() {
          return sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
        })
        .map(function(point) {
          return scribblerFactory(sketch, point);
        })
        .invoke('active', function() {
          return sketch.frameCount < 128;
        })
        .invoke('angle', _.partial(sketch.random, sketch.TWO_PI))
        .invoke('magnitude', 16);
    };

    sketch.draw = function() {
      scribblers.invoke('draw');
    };
  };
});
