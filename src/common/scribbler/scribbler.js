/**
 * TODO: documentation
 * TODO: factor out the sketch?
 */
angular.module('scribbler', [])
.factory('scribblerFactory', function(p5) {
  function setAttribute(attribute, value) {
    if(_.isFunction(value)) {
      this.attributes[attribute] = _.partial.apply(null, _.rest(arguments));
    }
    else {
      this.attributes[attribute] = _.constant(value);
    }
    return this;
  }
  
  function calc(attribute) {
    return this.attributes[attribute]();
  }
  
  function draw() {
    _.chain(this.scribbles)
      .filter(function(scribble) {
        return this.calc('active');
      }, this)
      .forEach(function(scribble) {
        var offset = p5.Vector.fromAngle(this.calc('angle'))
          .setMag(this.calc('magnitude'));
        var nextPoint = p5.Vector.add(scribble.point, offset);

        this.sketch.line(scribble.point.x, scribble.point.y, nextPoint.x, nextPoint.y);

        scribble.point = nextPoint;
      }, this);
    return this;
  }
  
  var scribbler = {
    angle: _.partial(setAttribute, 'angle'),
    magnitude: _.partial(setAttribute, 'magnitude'),
    active: _.partial(setAttribute, 'active'),
    calc: calc,
    draw: draw
  };
  
  return function(sketch, properties) {
    var obj = Object.create(scribbler);
    obj.attributes = {};
    
    obj.sketch = sketch;
    
    obj.angle(sketch.random, -sketch.PI, sketch.PI)
      .magnitude(16)
      .active(true);
    
    properties = _.assign({
      x: _.constant(sketch.width / 2),
      y: _.constant(sketch.height / 2),
      count: _.constant(1)
    }, properties);
    
    obj.scribbles = _.map(_.times(properties.count()), function(index) {
      return {
        point: sketch.createVector(properties.x(), properties.y())
      };
    });
    
    return obj;
  };
});
