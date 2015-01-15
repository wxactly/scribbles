angular.module('scribbles', [
  'templates-app',
  'templates-common',
  'angular-p5',
  'scribbles.index',
  'scribbles.scribble',
  'scribbles.sketches',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
})
.run(function() {
	
})
.controller('AppCtrl', function($scope, $location) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if(angular.isDefined(toState.data.pageTitle)) {
      $scope.pageTitle = toState.data.pageTitle + ' | scribbles - wxactly';
    }
  });
});
