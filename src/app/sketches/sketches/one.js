angular.module('scribbles.sketches')
.run(function(sketchList) {
  sketchList.push({
    name: 'one'
  });
})
.factory('one', function(p5, scribblerFactory, scribblerValueGenerator) {
  return function(sketch) {
    var scribblers;
  
    sketch.setup = function() {
      sketch.createCanvas(512, 512);
      
      sketch.background(255);
      sketch.stroke(0);

      scribblers = _.chain(_.times(128))
        .map(function() {
          return scribblerFactory(sketch, {
            point: sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height))
          });
        })
        .map(function(scribbler) {
          return scribbler
            .active(function() {
              return sketch.frameCount < 128;
            })
            .angle(scribblerValueGenerator.randomGaussian(0, sketch.PI))
            .magnitude(16);
        });
    };

    sketch.draw = function() {
      scribblers.invoke('draw');
    };
  };
});
