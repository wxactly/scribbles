describe('scribbler', function() {
  beforeEach(module('angular-p5'));
  beforeEach(module('scribbler'));

  var scribblerFactory;
  var sketch;

  beforeEach(inject(function(_scribblerFactory_, p5) {
    scribblerFactory = _scribblerFactory_;
    sketch = new p5(angular.noop);
  }));

  describe('scribblerFactory', function() {
    it('should return an instantiated scribbler', function() {
      var properties = {
        x: _.constant(0),
        y: _.constant(0)
      };
      var scribbler = scribblerFactory(sketch, properties);
      
      expect(angular.isFunction(scribbler.draw)).toBe(true);
      expect(scribbler.sketch).toBe(sketch);
    });
  });
  
  describe('calc', function() {
    it('should execute callbacks and calculate fresh values', function() {
      var scribbler = scribblerFactory(sketch);
      
      var i = 0;
      scribbler.magnitude(function() {
        return i++;
      });
      
      expect(scribbler.calc('magnitude')).toBe(0);
      expect(scribbler.calc('magnitude')).toBe(1);
      expect(scribbler.calc('magnitude')).toBe(2);
    });
  });
  
  describe('active', function() {
    it('should set value', function() {
      var scribbler = scribblerFactory(sketch);
      
      expect(scribbler.active(false).calc('active')).toBe(false);
      
      expect(scribbler.active(true).calc('active')).toBe(true);
    });
  });
  
  describe('angle', function() {
    it('should set value', function() {
      var scribbler = scribblerFactory(sketch);
      
      expect(scribbler.angle(3.14).calc('angle')).toBe(3.14);
      
      expect(scribbler.angle(1.57).calc('angle')).toBe(1.57);
    });
  });
  
  describe('magnitude', function() {
    it('should set value', function() {
      var scribbler = scribblerFactory(sketch);
      
      expect(scribbler.magnitude(5).calc('magnitude')).toBe(5);
      
      expect(scribbler.magnitude(25).calc('magnitude')).toBe(25);
    });
  });
});
