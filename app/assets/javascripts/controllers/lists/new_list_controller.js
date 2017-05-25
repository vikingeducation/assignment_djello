djello.controller('newListsCtrl',
  ['$scope', 'listService', 'board', 'lists', '$state', '$rootScope',
  function($scope, listService, board, lists, $state, $rootScope) {

    $scope.lists = lists;

    $scope.board = board;

    $scope.displayForm = false;

    $scope.changeDisplay = function() {
      $scope.displayForm = !$scope.displayForm;
    }

    $scope.createList = function() {
      console.log('creating list')
      $scope.newList.board_id = board.id;
      listService.createList($scope.newList)
                  .then( function(response) {
                          $scope.newList = {};
                          $scope.lists.push(response);
                        })
    }

    // $scope.deleteList = function(id) {
    //   listService.delete(id)
    //              .then( function() {
    //                 listService.getAll(board.id)
    //                            .then( function(response) {
    //                             angular.copy(response, $scope.lists);
    //                            });
    //              })
    // }

    $scope.$on('lists.changed', function() {
      listService.getAll(board.id)
                 .then( function(response) {
                  angular.copy(response, $scope.lists);
                 });
    })

  }])