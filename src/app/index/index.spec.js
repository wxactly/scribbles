describe('index', function() {
  beforeEach(module('scribbles.index'));
  beforeEach(module('scribbles.sketches'));

  describe('IndexCtrl', function() {
    it('should have a sketch list', inject(function($controller, sketchList) {
      var scope = {};
      var scribbleCtrl = $controller('IndexCtrl', {
        $scope: scope
      });
      expect(scope.sketchList).toEqual(sketchList);
    }));
  });
});
