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
      sketch.stroke(0);

      scribbler = scribblerFactory(sketch, {
        x: _.partial(sketch.random, 0, sketch.width),
        y: _.partial(sketch.random, 0, sketch.height),
        count: _.constant(128)
      })
      .active(function() {
        return sketch.frameCount < 128;
      });
    };

    sketch.draw = function() {
      scribbler.draw();
    };
  };
});
