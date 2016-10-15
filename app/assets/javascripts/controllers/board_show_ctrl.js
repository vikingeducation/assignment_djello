app.controller('BoardShowCtrl',
['BoardService',
'$scope',
'currentBoard',
'$state',
'listsCache',
'boardsData',
'usersData',
function(
  BoardService,
  $scope,
  currentBoard,
  $state,
  listsCache,
  boardsData,
  usersData,
  noticeData) {

  $scope.currentBoard = currentBoard;
  $scope.listsCache = listsCache;
  $scope.boardsData = boardsData;
  $scope.usersData = usersData;
  $scope.noticeData = noticeData;

  $scope.$on('boards.changeSelected', function(ev, newSelected) {
    $state.go('boards.show', {id: newSelected.id});
  });

}]);
