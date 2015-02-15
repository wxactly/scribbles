/**
 * TODO: documentation
 * TODO: factor out the sketch?
 * TODO: rename scribble/scribbles?
 * TODO: add stroke config
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
    if(this.scribbles.length < count) {
      this.scribbles = this.scribbles.concat(_.times(count - this.scribbles.length, _.create));
    }
    else if(this.scribbles.length > count) {
      this.scribbles = _.dropRight(this.scribbles, this.scribbles.length - count);
    }
    
    var activeScribbles = _.filter(this.scribbles, function(scribble) {
      return this.calc('active');
    }, this);
    
    activeScribbles.forEach(function(scribble) {
      if(!scribble.point) {
        scribble.point = this.calc('initPoint');
      }
      
      var offset = p5.Vector.fromAngle(this.calc('heading'))
        .setMag(this.calc('magnitude'));
      var nextPoint = p5.Vector.add(scribble.point, offset);

      this.sketch.line(scribble.point.x, scribble.point.y, nextPoint.x, nextPoint.y);

      scribble.point = nextPoint;
    }, this);
    
    return this;
  }
  
  var scribbler = {
    initPoint: _.partial(setAttribute, 'initPoint'),
    count: _.partial(setAttribute, 'count'),
    active: _.partial(setAttribute, 'active'),
    heading: _.partial(setAttribute, 'heading'),
    magnitude: _.partial(setAttribute, 'magnitude'),
    calc: calc,
    draw: draw
  };
  
  return function(sketch, properties) {
    var obj = Object.create(scribbler);
    obj.attributes = {};
    obj.scribbles = [];
    
    obj.sketch = sketch;
    
    return obj
      .initPoint(sketch.createVector, sketch.width / 2, sketch.height / 2)
      .count(1)
      .active(true)
      .heading(sketch.random, -sketch.PI, sketch.PI)
      .magnitude(16);
  };
});
