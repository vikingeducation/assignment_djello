var app = angular.module('app', ['ui.router', 'restangular', 'angularModalService', 'angular-sortable-view']);



app.config([
  "$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = token;
  }
]);

app.config([
  'RestangularProvider',
  function(RestangularProvider) {

    
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({"content-type": "application/json"});
  }
]);



app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("boards", {
      url: "/",
      abstract: true,
      template: '<div ui-view></div>'
    })


    .state("boards.index", {
      url: "", 
      templateUrl: "/templates/boards/index.html",
      controller: "BoardsCtrl"
    })

    .state("boards.show", {
      url: ":id",
      templateUrl: "/templates/boards/show.html",
      controller: "BoardCtrl"
    })
})











app.factory("_", ['$window', function($window){
  return $window._;
}]);