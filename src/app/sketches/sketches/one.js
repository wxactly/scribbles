angular.module('scribbles.sketches')
.run(function(sketchList) {
  sketchList.push({
    name: 'one'
  });
})
.factory('one', function(p5, scribblerFactory) {
  return function(sketch) {
    var scribbler;

    sketch.setup = function() {
      sketch.createCanvas(512, 512);
      sketch.background(255);

      scribbler = scribblerFactory(sketch, {
        count: 128,
        point: function() {
          return sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
        }
      })
        .active(function() {
          return sketch.frameCount < 128;
        });
    };

    sketch.draw = function() {
      scribbler.draw();
    };
    
    sketch.mousePressed = function() {
      sketch.noLoop(true);
    };
  };
});
