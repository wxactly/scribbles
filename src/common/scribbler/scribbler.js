/**
 * TODO: documentation
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
    var count = this.sketch.floor(this.calc('count'));
    if(this.points.length < count) {
      this.points = this.points.concat(_.times(count - this.points.length, function() {
        return this.calc('initPoint');
      }, this));
    }
    else if(this.points.length > count) {
      this.points = _.dropRight(this.points, this.points.length - count);
    }
    
    var activePoints = _.filter(this.points, function(point) {
      return this.calc('active');
    }, this);

    activePoints.forEach(function(point) {
      var offset = p5.Vector.fromAngle(this.calc('heading'))
        .setMag(this.calc('magnitude'));
      var nextPoint = p5.Vector.add(point, offset);

      this.sketch.stroke(this.calc('stroke'));
      this.sketch.line(point.x, point.y, nextPoint.x, nextPoint.y);

      point.set(nextPoint);
    }, this);
    
    return this;
  }
  
  var scribbler = {
    initPoint: _.partial(setAttribute, 'initPoint'),
    count: _.partial(setAttribute, 'count'),
    active: _.partial(setAttribute, 'active'),
    heading: _.partial(setAttribute, 'heading'),
    magnitude: _.partial(setAttribute, 'magnitude'),
    stroke: _.partial(setAttribute, 'stroke'),
    calc: calc,
    draw: draw
  };
  
  return function(sketch, properties) {
    var obj = Object.create(scribbler);
    obj.attributes = {};
    obj.points = [];
    
    obj.sketch = sketch;
    
    return obj
      .initPoint(sketch.createVector, sketch.width / 2, sketch.height / 2)
      .count(1)
      .active(true)
      .heading(sketch.random, -sketch.PI, sketch.PI)
      .magnitude(16)
      .stroke(sketch.color(0));
  };
});
