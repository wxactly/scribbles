describe('scribble', function() {
  beforeEach(module('scribbles.scribble'));

  describe('ScribbleCtrl', function() {
    it('should have a sketch', inject(function($controller) {
      var scope = {};
      var scribbleCtrl = $controller('ScribbleCtrl', {$scope: scope});
      expect(scope.sketch instanceof p5).toBe(true);
    }));
  });
});
