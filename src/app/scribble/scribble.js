angular.module('scribbles.scribble', [
  'ui.router'
])
.config(function($stateProvider) {
  $stateProvider.state('scribble', {
    url: '/scribble',
    views: {
      "main": {
        controller: 'ScribbleCtrl',
        templateUrl: 'scribble/scribble.tpl.html'
      }
    },
    data: {
      pageTitle: 'Scribble'
    }
  });
})
.controller('ScribbleCtrl', function($scope) {
  $scope.sketch = new p5(function(sketch) {
    var points;

    sketch.setup = function() {
      var canvas = sketch.createCanvas(512, 512);
      canvas.parent('scribble');
      
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
  });
});
