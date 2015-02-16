/**
 * TODO: documentation
 * TODO: rename sketch -> p5?
 * TODO: rename active -> enabled
 * TODO: set defaults to null
 * TODO: rewrite tests against calc()
 */
angular.module('scribbler', [])
  .constant('scribblerAttributes', [
    'active',
    'heading',
    'magnitude',
    'stroke'
  ])
  .factory('scribblerFactory', function(p5, scribblerAttributes, scribblerEdgeFactory) {
    var scribbler = {
      draw: draw
    };

    function draw() {
      _(this.edges)
        .invoke('update')
        .filter('active')
        .forEach(function(edge) {
          var nextPoint = edge.nextPoint();

          this.sketch.stroke(edge.stroke);
          this.sketch.line(edge.point.x, edge.point.y, nextPoint.x, nextPoint.y);
        }, this)
        .value();

      return this;
    }

    function defineAttribute(attributes, attribute, value) {
      if(_.isFunction(value)) {
        attributes[attribute] = _.partial.apply(null, _.drop(arguments, 2));
      }
      else {
        attributes[attribute] = _.constant(value);
      }
    }

    function calculateAttribute(attributes, attribute) {
      return attributes[attribute](); //.apply(this);
    }

    return function(sketch, properties) {
      var attributes = {};

      properties = _.assign({
        count: 1,
        point: function() {
          return sketch.createVector(0, 0);
        }
      }, properties);

      var attributeMethods = _.zipObject(scribblerAttributes, _.map(scribblerAttributes, function(attribute) {
        var setAttribute = _.partial(defineAttribute, attributes, attribute);
        return function() {
          setAttribute.apply(this, arguments);
          return this;
        };
      }));

      var calc = _.partial(calculateAttribute, attributes);

      var edges = _.times(properties.count, function() {
        var point = properties.point(); //TODO: support the same interface as the attributes
        return scribblerEdgeFactory(calc, point);
      });

      _.assign(properties, attributeMethods, {
        edges: edges,
        sketch: sketch
      });

      return _.create(scribbler, properties)
        .active(true)
        .heading(sketch.random, -sketch.PI, sketch.PI)
        .magnitude(16)
        .stroke(sketch.color(0));
    };
  })
  .service('scribblerEdgeFactory', function(p5, scribblerAttributes) {
    var scribblerEdge = {
      update: update,
      nextPoint: nextPoint
    };

    function update() {
      var nextEdge = _.assign({
        point: this.nextPoint()
      }, _.zipObject(scribblerAttributes, _.map(scribblerAttributes, this.calc, this)));

      _.assign(this, nextEdge);

      return this;
    }

    function nextPoint() {
      //TODO: Cache for performance?
      var offset = p5.Vector.fromAngle(this.heading).setMag(this.magnitude);
      return p5.Vector.add(this.point, offset);
    }

    return function(calc, point) {
      return _.create(scribblerEdge, {
        calc: calc,
        point: point
      });
    };
  });
