angular.module('scribbles.scribble', [
  'ui.router'
])
.config(function($stateProvider) {
  $stateProvider.state('scribble', {
    url: '/scribble/:sketchName',
    views: {
      "main": {
        controller: 'ScribbleCtrl',
        templateUrl: 'scribble/scribble.tpl.html'
      }
    },
    data: {
      pageTitle: 'Scribble'
    }
  });
})
.controller('ScribbleCtrl', function($scope, $stateParams) {
  $scope.sketchName = $stateParams.sketchName;
});
