angular.module('scribbler', [])
.factory('scribblerFactory', function(p5) {
  var scribbler = {
    active: function(active) {
      this.properties.active = active;
      return this;
    },
    
    angle: function(angle) {
      this.properties.angle = angle;
      return this;
    },
    
    magnitude: function(magnitude) {
      this.properties.magnitude = magnitude;
      return this;
    },
    
    calc: function(property) {
      return _.result(this.properties, property);
    },
    
    draw: function() {
      if(this.calc('active')) {
        var point = p5.Vector.add(this.point, this.delta);
        var delta = p5.Vector.fromAngle(this.delta.heading() + this.calc('angle'))
          .setMag(this.calc('magnitude'));
      
        var nextPoint = p5.Vector.add(point, delta);
      
        this.sketch.line(point.x, point.y, nextPoint.x, nextPoint.y);
      
        this.point = point;
        this.delta = delta;
      }
      return this;
    }
  };
  
  return function(sketch, point, delta) {
    var obj = Object.create(scribbler);
    obj.properties = {};
    
    obj.sketch = sketch;
    obj.point = point || sketch.createVector(0, 0);
    obj.delta = delta || sketch.createVector(0, 0);
    
    return obj.active(true);
  };
});
