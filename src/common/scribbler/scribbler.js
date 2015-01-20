angular.module('scribbler', [])
.factory('scribblerFactory', function(p5) {
  var scribbler = {
    active: function(active) {
      this.attributes.active = active;
      return this;
    },
    
    angle: function(angle) {
      this.attributes.angle = angle;
      return this;
    },
    
    magnitude: function(magnitude) {
      this.attributes.magnitude = magnitude;
      return this;
    },
    
    calc: function(attribute) {
      var value = this.attributes[attribute];
      return _.isFunction(value) ? value.apply(this) : value;
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
  
  return function(sketch, properties) {
    var obj = Object.create(scribbler);
    obj.attributes = {};
    
    obj.sketch = sketch;
    
    _.defaults(obj, properties);
    _.defaults(obj, {
      point: sketch.createVector(0, 0),
      delta: sketch.createVector(0, 0)
    });
    
    return obj;
  };
});
