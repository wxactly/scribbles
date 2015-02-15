/**
 * TODO: documentation
 * TODO: rename sketch -> p5?
 */
angular.module('scribbler', [])
  .factory('scribblerFactory', function(p5, scribbleEdgeFactory) {
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
      //update
      var count = this.sketch.floor(this.calc('count'));
      if(this.edges.length < count) {
        this.edges = this.edges.concat(_.times(count - this.edges.length, function() {
          var edge = scribbleEdgeFactory();
          edge.point = this.calc('initPoint');
          return edge;
        }, this));
      }
      else if(this.edges.length > count) {
        this.edges = _.dropRight(this.edges, this.edges.length - count);
      }

      _.forEach(this.edges, function(edge) {
        _.assign(edge, {
          point: edge.nextPoint(),
          active: this.calc('active'),
          heading: this.calc('heading'),
          magnitude: this.calc('magnitude'),
          stroke: this.calc('stroke')
        });
      }, this);

      //draw
      _.forEach(_.filter(this.edges, 'active'), function(edge) {
          var nextPoint = edge.nextPoint();

          this.sketch.stroke(edge.stroke);
          this.sketch.line(edge.point.x, edge.point.y, nextPoint.x, nextPoint.y);
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
      obj.edges = [];

      obj.sketch = sketch;

      return obj
        .initPoint(sketch.createVector, sketch.width / 2, sketch.height / 2)
        .count(1)
        .active(true)
        .heading(sketch.random, -sketch.PI, sketch.PI)
        .magnitude(16)
        .stroke(sketch.color(0));
    };
  })
  .service('scribbleEdgeFactory', function() {
    var scribbleEdge = {
      nextPoint: nextPoint
    };

    function nextPoint() {
      var offset = p5.Vector.fromAngle(this.heading).setMag(this.magnitude);
      return p5.Vector.add(this.point, offset);
    }

    return function() {
      return _.create(scribbleEdge, {

      });
    };
  });
