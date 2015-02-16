describe('scribbler', function() {
  beforeEach(module('angular-p5'));
  beforeEach(module('scribbler'));

  var sketch;
  var scribbler;

  beforeEach(inject(function(scribblerFactory, p5) {
    sketch = new p5(angular.noop);
    spyOn(sketch, 'stroke');
    spyOn(sketch, 'line');
  }));

  describe('scribblerFactory', function() {
    it('should return an instantiated scribbler', inject(function(scribblerFactory) {
      scribbler = scribblerFactory(sketch);

      expect(angular.isFunction(scribbler.draw)).toBe(true);
      expect(scribbler.sketch).toBe(sketch);
    }));

    describe('point', function() {
      it('should set the initial point', inject(function(scribblerFactory) {
        var point1 = sketch.createVector(1, 2);

        scribbler = scribblerFactory(sketch, {
          point: _.constant(point1)
        })
          .magnitude(0) //so draw doesn't affect the point
          .draw();

        expect(sketch.line).toHaveBeenCalledWith(point1.x, point1.y, point1.x, point1.y);
      }));
    });

    describe('count', function() {
      it('should create the correct number of scribbles', inject(function(scribblerFactory) {
        scribbler = scribblerFactory(sketch, {
          count: 11
        })
          .draw();

        expect(sketch.line.calls.length).toEqual(11);
      }));
    });
  });

  describe('attribute methods', function() {
    beforeEach(inject(function(scribblerFactory) {
      scribbler = scribblerFactory(sketch);
    }));

    xdescribe('calc', function() {
      it('should execute callbacks and calculate fresh values', function() {
        var i = 0;
        scribbler.magnitude(function() {
          return i++;
        });

        expect(scribbler.calc('magnitude')).toBe(0);
        expect(scribbler.calc('magnitude')).toBe(1);
        expect(scribbler.calc('magnitude')).toBe(2);
      });

      it('should accept arguments and pass them to callbacks', function() {
        var testObj = {};
        var testValue = 3;

        var magnitudeSpy = jasmine.createSpy('magnitudeSpy').andReturn(testValue);
        scribbler.magnitude(magnitudeSpy, testObj);

        var magnitude = scribbler.calc('magnitude');

        expect(magnitudeSpy).toHaveBeenCalledWith(testObj);
        expect(magnitude).toEqual(testValue);
      });
    });

    describe('active', function() {
      it('should only draw when active', function() {
        scribbler.active(false).draw();

        expect(sketch.line).not.toHaveBeenCalled();

        scribbler.active(true).draw();

        expect(sketch.line).toHaveBeenCalled();
      });
    });

    xdescribe('heading', function() {
      it('should set value', function() {
        expect(scribbler.heading(3.14).calc('heading')).toBe(3.14);

        expect(scribbler.heading(1.57).calc('heading')).toBe(1.57);
      });
    });

    xdescribe('magnitude', function() {
      it('should set value', function() {
        expect(scribbler.magnitude(5).calc('magnitude')).toBe(5);

        expect(scribbler.magnitude(25).calc('magnitude')).toBe(25);
      });
    });

    describe('stroke', function() {
      it('should call sketch.stroke with a test color', function() {
        var testColor = sketch.color(10, 20, 30);
        scribbler.stroke(testColor).draw();

        expect(sketch.stroke).toHaveBeenCalledWith(testColor);
      });
    });
  });
});
