angular.module( 'scribbles.index', [
  'ui.router'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'index', {
    url: '/',
    views: {
      "main": {
        controller: 'IndexCtrl',
        templateUrl: 'index/index.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})
.controller( 'IndexCtrl', function IndexCtrl( $scope ) {
	
});
