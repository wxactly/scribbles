describe('scribbler', function() {
  beforeEach(module('angular-p5'));
  beforeEach(module('scribbler'));

  var sketch;
  var scribbler;

  beforeEach(inject(function(scribblerFactory, p5) {
    sketch = new p5(angular.noop);
    spyOn(sketch, 'stroke');
    spyOn(sketch, 'line');

    scribbler = scribblerFactory(sketch);
  }));

  describe('scribblerFactory', function() {
    it('should return an instantiated scribbler', function() {
      expect(angular.isFunction(scribbler.draw)).toBe(true);
      expect(scribbler.sketch).toBe(sketch);
    });
  });
  
  describe('calc', function() {
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
  
  describe('initPoint', function() {
    it('should set value only once', function() {
      scribbler.magnitude(0); //so draw doesn't affect the point
      
      var point1 = new p5.Vector(1, 2);
      scribbler.initPoint(point1).draw();
      
      expect(sketch.line).toHaveBeenCalledWith(point1.x, point1.y, point1.x, point1.y);
      expect(sketch.line.calls.length).toEqual(1);
      
      var point2 = new p5.Vector(3, 4);
      scribbler.initPoint(point2).draw();
      
      expect(sketch.line).toHaveBeenCalledWith(point1.x, point1.y, point1.x, point1.y);
      expect(sketch.line.calls.length).toEqual(2);
    });
  });
  
  describe('count', function() {
    it('should create the correct number of scribbles', function() {
      scribbler.count(11).draw();
      
      expect(sketch.line.calls.length).toEqual(11);
    });
  });
  
  describe('active', function() {
    it('should set value', function() {
      expect(scribbler.active(false).calc('active')).toBe(false);
      
      expect(scribbler.active(true).calc('active')).toBe(true);
    });
  });
  
  describe('heading', function() {
    it('should set value', function() {
      expect(scribbler.heading(3.14).calc('heading')).toBe(3.14);
      
      expect(scribbler.heading(1.57).calc('heading')).toBe(1.57);
    });
  });

  describe('magnitude', function() {
    it('should set value', function() {
      expect(scribbler.magnitude(5).calc('magnitude')).toBe(5);

      expect(scribbler.magnitude(25).calc('magnitude')).toBe(25);
    });
  });

  describe('stroke', function() {
    it('should call sketch.stroke with a test color', function() {
      var testColor = sketch.color(10, 20, 30);
      scribbler.stroke(testColor);

      expect(scribbler.calc('stroke')).toBe(testColor);

      scribbler.draw();

      expect(sketch.stroke).toHaveBeenCalledWith(testColor);
    });
  });
});
