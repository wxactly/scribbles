describe('scribbler', function() {
  beforeEach(module('angular-p5'));
  beforeEach(module('scribbler'));

  describe('scribblerFactory', function() {
    it('should return an instantiated scribbler', inject(function(scribblerFactory) {
      var point = {};
      var delta = {};
      
      var scribbler = scribblerFactory({}, point, delta);
      
      expect(angular.isFunction(scribbler.draw)).toBe(true);
      expect(scribbler.point).toBe(point);
      expect(scribbler.delta).toBe(delta);
    }));
  });
  
  describe('active', function() {
    it('should handle constants and callbacks', inject(function(scribblerFactory) {
      var scribbler = scribblerFactory({}, {}, {});
      
      scribbler.active(false);
      expect(scribbler.calc('active')).toBe(false);
      
      scribbler.active(function() {
        return true;
      });
      expect(scribbler.calc('active')).toBe(true);
    }));
  });
  
  describe('angle', function() {
    it('should handle constants and callbacks', inject(function(scribblerFactory) {
      var scribbler = scribblerFactory({}, {}, {});
      
      scribbler.angle(3.14);
      expect(scribbler.calc('angle')).toBe(3.14);
      
      scribbler.angle(function() {
        return 1.57;
      });
      expect(scribbler.calc('angle')).toBe(1.57);
    }));
  });
  
  describe('magnitude', function() {
    it('should handle constants and callbacks', inject(function(scribblerFactory) {
      var scribbler = scribblerFactory({}, {}, {});
      
      scribbler.magnitude(5);
      expect(scribbler.calc('magnitude')).toBe(5);
      
      scribbler.magnitude(function() {
        return 25;
      });
      expect(scribbler.calc('magnitude')).toBe(25);
    }));
  });
});
