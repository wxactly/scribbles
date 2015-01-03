angular.module('p5', [])
.service('p5', function($window) {
  return $window.p5;
})
.directive('p5Sketch', function(p5) {
  return {
    restrict: 'AE',
    link: function(scope, element, attrs) {
      new p5(function(sketch) {
        sketch.setup = function() {
          var width = attrs.width || 100;
          var height = attrs.height || 100;
          var canvas = sketch.createCanvas(width, height);
          canvas.parent(element[0]);
        };
        
        sketch.draw = function() {
          //debug
          sketch.background(255, 0, 0);
        };
      });
    }
  };
});
