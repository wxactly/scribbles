angular.module('scribbles.index', [
  'ui.router'
])
.config(function($stateProvider) {
  $stateProvider.state('index', {
    url: '/',
    views: {
      "main": {
        controller: 'IndexCtrl',
        templateUrl: 'index/index.tpl.html'
      }
    },
    data: {
      pageTitle: 'Home'
    }
  });
})
.controller('IndexCtrl', function($scope, sketchList) {
	$scope.sketchList = sketchList;
});
