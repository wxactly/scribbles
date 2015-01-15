describe('scribble', function() {
  beforeEach(module('scribbles.scribble'));
  beforeEach(module('scribbles.sketches'));

  beforeEach(function() {
    angular.module('scribbles.sketches', [])
    .factory('testScribble', function() {
      return angular.noop;
    });
  });

  describe('ScribbleCtrl', function() {
    it('should specify the testScribble sketch', inject(function($controller, testScribble) {
      var scope = {};
      var stateParams = {
        sketchName: 'testScribble'
      };
      var scribbleCtrl = $controller('ScribbleCtrl', {
        $scope: scope,
        $stateParams: stateParams
      });
      expect(scope.sketchName).toEqual(stateParams.sketchName);
    }));
  });
});
