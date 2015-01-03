describe('p5', function() {
  beforeEach(module('p5'));
  
  describe('service', function() {
    it('should be p5', inject(function($window, p5) {
      expect(p5).toEqual($window.p5);
    }));
  });
  
  describe('sketch', function() {
    var $compile;
    var $rootScope;
    var element;
    var canvas;
  
    beforeEach(inject(function(_$compile_, _$rootScope_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    var renderSketchTemplate = function(template, cb) {
      runs(function() {
        element = $compile(template)($rootScope);
        $rootScope.$digest();
      });
      
      waitsFor(function() {
        canvas = element.find('canvas')[0];
        return canvas;
      });
      
      runs(cb);
      
      runs(function() {
        element = null;
        canvas = null;
      });
    };

    it('should render a canvas element', function() {
      renderSketchTemplate('<p5-sketch></p5-sketch>', function() {
        expect(canvas).toBeTruthy();
      });
    });

    it('should render a canvas element with width and height set', function() {
      renderSketchTemplate('<p5-sketch width="240" height="160"></p5-sketch>', function() {
        expect(canvas.width).toEqual(240);
        expect(canvas.height).toEqual(160);
      });
    });
  });
});
